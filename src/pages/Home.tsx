import { motion } from 'motion/react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);

  const handlePlanSelect = async (plan: any) => {
    setLoadingPlan(plan.name);
    try {
      const response = await fetch('/.netlify/functions/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: [{
            name: `${plan.name} Plan`,
            price: parseFloat(plan.price),
            quantity: 1,
            img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDF8czjo3zSU0mX8HUjCM10UEk8NXwCrbPwxFEJc5an_s8HSb06uH9JCPKZqfty8N43vWI6LRPkX4JkuOXQlpN5Q8t4MHhJwa0SslNqhLBuzo4hcRybMtMtL_zjCSAvr1lB9s9uEjJUJuQCSlux2bSnFRLDTzYEvxz3CeBdgJ5WeXbcdKqS9RUkgkZcQMiyIKXVMJ82lSQm-m_2gdcFVZPG-nGPBtWjSQ0rqlI7pyTYZjY1yPaNCsZdJysM1MtfMYWutNWY3cbd5Q'
          }],
          mode: 'subscription',
          successUrl: `${window.location.origin}/checkout?status=success`,
          cancelUrl: `${window.location.origin}/`,
        }),
      });

      const session = await response.json();
      if (session.url) {
        if (window.self !== window.top) {
          window.open(session.url, '_blank');
        } else {
          window.location.href = session.url;
        }
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
    } finally {
      setLoadingPlan(null);
    }
  };

  return (
    <main className="pt-24">
      <section className="relative px-6 py-16 md:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative z-10"
          >
            <span className="inline-block bg-secondary-container text-on-secondary-container font-bold px-4 py-1.5 rounded-full mb-6">FUEL YOUR POTENTIAL</span>
            <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-on-surface leading-tight mb-6 tracking-tight">
              Freshly Prepared,<br /><span className="text-primary italic">Miami Inspired.</span>
            </h1>
            <p className="text-lg md:text-xl text-on-surface-variant leading-relaxed mb-8 max-w-lg">
              We handle the shopping, prepping, and cooking. You just enjoy the flavors of home-cooked Cuban nutrition delivered to your door.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/menu">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="hero-gradient px-10 py-5 rounded-full text-on-primary font-headline font-extrabold text-lg shadow-ambient flex items-center gap-2"
                >
                  SEE MENU
                  <span className="material-symbols-outlined">arrow_forward</span>
                </motion.button>
              </Link>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden shadow-2xl relative rotate-3 hover:rotate-0 transition-transform duration-500">
              <img
                className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDF8czjo3zSU0mX8HUjCM10UEk8NXwCrbPwxFEJc5an_s8HSb06uH9JCPKZqfty8N43vWI6LRPkX4JkuOXQlpN5Q8t4MHhJwa0SslNqhLBuzo4hcRybMtMtL_zjCSAvr1lB9s9uEjJUJuQCSlux2bSnFRLDTzYEvxz3CeBdgJ5WeXbcdKqS9RUkgkZcQMiyIKXVMJ82lSQm-m_2gdcFVZPG-nGPBtWjSQ0rqlI7pyTYZjY1yPaNCsZdJysM1MtfMYWutNWY3cbd5Q"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="text-4xl font-headline font-extrabold text-on-surface mb-12">The Weekly Rhythm</h2>
              <div className="space-y-12">
                {[
                  { step: 1, title: "The Cutoff", desc: "Orders must be placed or modified by Friday at 11:59 PM EST. This allows our family kitchen to source the freshest ingredients from local Miami vendors over the weekend." },
                  { step: 2, title: "The Delivery", desc: "We deliver every Sunday & Wednesday morning across the Greater Miami area. Your meals arrive in insulated thermal bags to ensure peak freshness." },
                  { step: 3, title: "The Flexibility", desc: "Heading out of town? Easily pause your subscription or skip a week via your dashboard before the Friday cutoff. No questions asked." }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-secondary text-on-secondary flex items-center justify-center rounded-full font-headline font-black text-xl">{item.step}</div>
                    <div>
                      <h4 className="text-xl font-headline font-bold mb-2 text-on-surface">{item.title}</h4>
                      <p className="text-on-surface-variant leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="bg-surface-container rounded-lg p-1 text-center overflow-hidden">
              <div className="p-8">
                <h4 className="text-2xl font-headline font-bold mb-4">Miami Delivery Zones</h4>
                <p className="text-sm text-on-surface-variant mb-6 italic">We currently serve Miami-Dade and parts of Broward County.</p>
              </div>
              <div className="bg-surface-container-highest h-96 w-full rounded-lg relative overflow-hidden grayscale contrast-125">
                <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOeddmflleEpeQSb0qhjO10hEqQO7fcHq68ZAY0OJlJXGi-Dw8i0zjIKgwksxPckp4FAr2YcjO9NDL-Ajkc-Srk46oRcmHRpNu2B51fXZhZn2x9rsSQjs6f4-yFnG7LgwdjKOe30UqgndgeakR5docpwYpKJ7VqCzjlsBWaw5jocBNxXcUK6SpYsB_8gJjiRVydzE78hi-aNC6pk8bqXY6a5XE3Iz2jQ96lHf2v4aFvR684jOBIaq1Gz--LvnBZ7DLgDB-pmH9PA" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-secondary/10 flex items-center justify-center">
                  <div className="glass-panel p-4 rounded-full flex items-center gap-2 shadow-lg">
                    <span className="material-symbols-outlined text-primary">location_on</span>
                    <span className="font-bold text-on-surface">Serving All 305/786</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-surface-container-low py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-headline font-extrabold text-on-surface mb-4">Choose Your Fuel Level</h2>
            <p className="text-on-surface-variant">Flexible plans for every lifestyle. No commitments, skip or cancel anytime.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Intro", price: "59", desc: "Perfect for busy professionals.", features: ["4 Meals Per Week", "Curated Chef Menu", "Standard Delivery"], popular: false },
              { name: "Performance", price: "109", desc: "Ideal for active fitness enthusiasts.", features: ["8 Meals Per Week", "Priority Menu Access", "Free Insulated Bag"], popular: true },
              { name: "Family", price: "149", desc: "Best value for the whole household.", features: ["12 Meals Per Week", "Custom Dietary Tags", "VIP Support"], popular: false }
            ].map((plan, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className={`${plan.popular ? 'hero-gradient text-on-primary' : 'bg-surface-container-lowest'} rounded-lg p-8 flex flex-col h-full shadow-xl relative overflow-hidden`}
              >
                {plan.popular && <div className="absolute top-0 right-0 bg-tertiary-fixed text-on-tertiary-fixed px-4 py-1 font-bold text-xs uppercase tracking-widest rounded-bl-lg">Most Popular</div>}
                <div className="mb-6">
                  <h3 className="text-2xl font-headline font-bold mb-2">{plan.name}</h3>
                  <p className={`${plan.popular ? 'text-on-primary/80' : 'text-on-surface-variant'} text-sm`}>{plan.desc}</p>
                </div>
                <div className="mb-8">
                  <span className="text-4xl font-headline font-extrabold">${plan.price}</span>
                  <span className={plan.popular ? 'text-on-primary/80' : 'text-on-surface-variant'}>/week</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="material-symbols-outlined">check_circle</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  onClick={() => handlePlanSelect(plan)}
                  disabled={loadingPlan !== null}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-white text-primary' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'} disabled:opacity-50`}
                >
                  {loadingPlan === plan.name ? 'Processing...' : 'Get Started'}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
