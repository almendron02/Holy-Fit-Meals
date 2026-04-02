import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Stripe from "stripe";
import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  let stripe: Stripe | null = null;
  if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  let resend: Resend | null = null;
  if (process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }

  app.use(express.json());

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", stripeConfigured: !!stripe });
  });

  // Netlify Function compatibility route for local development
  app.post("/.netlify/functions/create-checkout-session", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe is not configured" });
    }

    const { items, successUrl, cancelUrl, mode = "payment" } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item: any) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: item.img ? [item.img] : [],
            },
            unit_amount: Math.round(item.price * 100),
            ...(mode === "subscription" && {
              recurring: { interval: "week" },
            }),
          },
          quantity: item.quantity || 1,
        })),
        mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/create-checkout-session", async (req, res) => {
    if (!stripe) {
      return res.status(500).json({ error: "Stripe is not configured" });
    }

    const { items, successUrl, cancelUrl, mode = "payment" } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: items.map((item: any) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: item.img ? [item.img] : [],
            },
            unit_amount: Math.round(item.price * 100),
            ...(mode === "subscription" && {
              recurring: { interval: "week" },
            }),
          },
          quantity: item.quantity || 1,
        })),
        mode: mode as Stripe.Checkout.SessionCreateParams.Mode,
        success_url: successUrl,
        cancel_url: cancelUrl,
      });

      res.json({ url: session.url });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Netlify Function compatibility route for sending emails locally
  app.post("/.netlify/functions/send-contact-email", async (req, res) => {
    if (!resend) {
      return res.status(500).json({ error: "Resend is not configured" });
    }

    const { name, email, message } = req.body;

    try {
      const { data, error } = await resend.emails.send({
        from: "Holy Fit Meals Contact <onboarding@resend.dev>",
        to: ["angelo.mgleza@gmail.com"],
        subject: `New Contact Form Submission from ${name}`,
        replyTo: email,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, "<br>")}</p>
        `,
      });

      if (error) {
        return res.status(400).json({ error: error.message });
      }

      res.json({ message: "Email sent successfully", data });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
