import { motion } from 'motion/react';

export default function OurStory() {
  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            alt="Family in Miami Kitchen"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCbQSbdMj1-y6vJGV5UsiYMXJJ8uw1LC42P8OWTH-TboLN-xw_U__wRvcr1JdcSwoWyeBuvi3DKC0HWgs68vZxqf9EyIwoXEkX4mxwskWAYnjy7waUwX92drRghR3I1YTI2Dm3CwfACGTy7JPmLsgxGiRmIluBKBPJ0SPgxycwWRJzIeUKWJtkqAK_RCg4pooLkYiO4XlpQIs-KrST0HbzQVP0jvu1qRe0FYK4CuNObpKV1uR3FOfDojmhmisH_9UE10tRZvUg29Q"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>
        <div className="relative z-10 max-w-4xl px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-headline text-5xl md:text-7xl font-extrabold text-white leading-none tracking-tighter mb-6"
          >
            From Our Miami <br /><span className="text-primary-fixed">Kitchen to Your Table.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white text-lg md:text-xl max-w-2xl mx-auto font-medium opacity-90"
          >
            Hand-crafted meals fueled by Cuban heritage and a passion for peak performance.
          </motion.p>
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
