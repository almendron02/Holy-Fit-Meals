import { motion } from 'motion/react';
import React, { useState } from 'react';

export default function OurStory() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/.netlify/functions/send-contact-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message);
    }
  };

  return (
    <main className="pt-20">
      {/* Contact Form Section (Replaces Hero) */}
      <section className="relative py-20 px-6 bg-surface-container-low overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <span className="inline-block bg-primary-container text-on-primary-container font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider text-xs">Get in Touch</span>
            <h1 className="font-headline text-5xl md:text-7xl font-extrabold text-on-surface leading-tight mb-6 tracking-tighter">
              Questions? <br /><span className="text-primary italic">We'd love to hear from you.</span>
            </h1>
            <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-lg">
              Whether you have a question about our menu, delivery zones, or just want to say hi, our team is ready to help.
            </p>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 text-on-surface">
                <span className="material-symbols-outlined text-primary">mail</span>
                <span className="font-medium">angelo.mgleza@gmail.com</span>
              </div>
              <div className="flex items-center gap-4 text-on-surface">
                <span className="material-symbols-outlined text-primary">location_on</span>
                <span className="font-medium">Serving the Greater Miami Area</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-surface-container-lowest p-8 md:p-10 rounded-3xl shadow-ambient border border-outline-variant"
          >
            {status === 'success' ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-5xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">Message Sent!</h3>
                <p className="text-on-surface-variant mb-8">Thank you for reaching out. We'll get back to you as soon as possible.</p>
                <button
                  onClick={() => setStatus('idle')}
                  className="px-8 py-3 bg-primary text-on-primary rounded-full font-bold"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-bold text-on-surface ml-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-surface-container border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-bold text-on-surface ml-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-surface-container border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                    placeholder="your@email.com"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-bold text-on-surface ml-1">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-5 py-4 rounded-2xl bg-surface-container border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                    placeholder="How can we help?"
                  ></textarea>
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-error-container text-on-error-container rounded-xl text-sm flex items-center gap-3">
                    <span className="material-symbols-outlined">error</span>
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-5 hero-gradient text-on-primary rounded-2xl font-headline font-extrabold text-lg shadow-ambient flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    'Sending...'
                  ) : (
                    <>
                      SEND MESSAGE
                      <span className="material-symbols-outlined">send</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <img
                alt="Cuban Heritage Ingredients"
                className="rounded-lg w-full aspect-[4/3] object-cover shadow-2xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAORDuXq63qaIQvjDhISxkDZmu0c-ssLeTh7G3dYuYyWF0d4rbcbxssjCwnAoGOIPjSVYnpY6Uu3s_U0KhTMkMeU5zTfGGvivG9MEU9TEp2SRJppYo-Rjm-Yne7o8dUqGvvKjYayIeXvS9WNveEtup877oJLNtjTOfFvnjZ54zbEl-wsa4G6BDGUUk2iuSrnFJRP3FPBSTTrzhXbvehXYENZnay9fPaAbBHOY7U8cnMqI2HHPrSaaANif8t4QyIwBOtCdvMvryR-w"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="absolute -bottom-12 -right-8 z-20 w-1/2 hidden md:block"
            >
              <img
                alt="Family cooking lesson"
                className="rounded-lg border-8 border-surface-container shadow-xl"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA2AH5E6nyUJILfBO-9be693bcJjho2TN97ggtm9G0H_0F7jtOugKn1I0RleMypb9IikK-dcNFHBEUOS3M7Bqi5xitNv_qEmA4oPVXrO8OKkmuHoZ0vd7728C9J18xMQieH7Ykf3i9KFDqlLN-1pEQXgeIcRBSYIApEcSZFcKmuBTsOjytYRQtEL78VfBaLeIAx7dqWPH4WWvs8F93fz7FiZIpDTxl8EddG1BEM5dyygs6BGA4cHUgRq7PWY__obO_xcCLOB2t6Mw"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div className="inline-flex items-center gap-2 text-primary font-bold tracking-widest uppercase text-sm">
              <span className="w-12 h-px bg-primary"></span> Our Legacy
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-headline text-4xl md:text-5xl font-extrabold text-on-surface leading-tight"
            >
              A Heritage of <span className="text-secondary italic">Sabor</span> and Strength.
            </motion.h2>
            <div className="space-y-6 text-on-surface-variant leading-relaxed text-lg">
              <p>
                Born and raised in the heart of Miami, our story began in a small apartment kitchen where the aroma of café con leche and sautéing onions filled the air. We grew up understanding that food wasn't just fuel—it was the rhythm of our family.
              </p>
              <p>
                As fitness enthusiasts, we struggled to find convenience that didn't compromise our Cuban roots or our health goals. We didn't want bland chicken and broccoli; we wanted the bold, vibrant flavors of our grandmother’s kitchen, optimized for a modern, active lifestyle.
              </p>
              <p>
                Holy Fit Meals was created to bridge that gap. We take the authentic recipes passed down through generations and reimagine them with high-quality, locally sourced ingredients that power your best self.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-surface-container-low py-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <span className="material-symbols-outlined text-primary text-6xl mb-6">favorite</span>
            <h2 className="font-headline text-3xl md:text-5xl font-extrabold text-on-surface mb-8">Our Mission</h2>
            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="font-headline text-4xl md:text-6xl font-black text-secondary leading-tight tracking-tight italic"
            >
              "To Fuel Miami with Love, Heritage, and Freshness."
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
            {[
              { title: "Authentic Flavors", desc: "Zero compromise on the spices and techniques that make Miami cuisine iconic.", icon: "restaurant", color: "border-primary" },
              { title: "Fitness Focused", desc: "Precision macros designed to help you crush your goals without feeling deprived.", icon: "fitness_center", color: "border-secondary" },
              { title: "Locally Made", desc: "Cooked fresh in Miami daily, supporting our local farmers and community.", icon: "local_shipping", color: "border-tertiary" }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`bg-surface-container-lowest p-10 rounded-lg shadow-sm border-t-4 ${item.color}`}
              >
                <div className="w-16 h-16 bg-surface-container p-4 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-3xl">{item.icon}</span>
                </div>
                <h3 className="font-headline text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-on-surface-variant">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
