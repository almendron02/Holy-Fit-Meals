import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

interface Meal {
  name: string;
  desc: string;
  cals: number;
  prot: string;
  carb: string;
  fat: string;
  tag: string;
  img: string;
  category: string;
  price: number;
}


export default function Menu() {
  const [activeCategory, setActiveCategory] = useState('Cuban Classics');
  const { addToCart, updateQuantity, removeFromCart, cart, subtotal, totalMeals } = useCart();
  const navigate = useNavigate();

  const meals: Meal[] = [
    {
      name: "Vaca Frita Bowl",
      desc: "Traditional crispy shredded beef sautéed with onions and garlic, served with citrus-infused cauliflower rice.",
      cals: 420,
      prot: "38g",
      carb: "12g",
      fat: "22g",
      tag: "Chef's Choice",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDb2m7JXg7IaNnuLCbNkRSrd5trUoNt4TAbztwqm4fDT_JVCICyy5vMdmj0_twUX14WJKEwXyDK0VBlClrFzM4069-gHkZ_tEm4b6vmKCxugmFbdIRTS6LpoGmmRR1pEeO24hlLGRn22xXQpSjQx-3s4LyIdQrdhrSheCRIE0r0orng6FqKUHK1arjmVKABNnfRzIAzkZFY097H4OLOTRveYR1tMfi4jcLjmwoDt89OA1hXoG7GpH05wdjpWNW4mR0ynSxCAVB0Qw",
      category: "Cuban Classics",
      price: 14.99
    },
    {
      name: "Tropical Salmon Salsa",
      desc: "Sustainable Atlantic salmon with a vibrant mango and avocado salsa over herb-roasted sweet potato gems.",
      cals: 510,
      prot: "42g",
      carb: "34g",
      fat: "18g",
      tag: "Performance",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAw8RYLTVcg6QFsKoJALiLYEmswwa024x2CZNoYfjcEkJ_g7mkiGieGYmIrjUIGCCpSj9qHD6yZOR7IKRpJ4iGIsO3EFVnjn5EzEQpuAVR_TUDtD_3yYWpo9Xeg8tWtC0f69PPXFemBDPhInukza8xgjcWzVI8HQvUEq5moR37LgbyrJLyPnyvONIctYkLvoaGovDj4DrGnCTOHDskFo1OoPW1fatAU1_KxgwPCu_GdxrqrPrdXj4q-vInvQCD_h8ox3bwrjIk_oQ",
      category: "Performance",
      price: 16.99
    },
    {
      name: "Mojo Chicken & Mash",
      desc: "Abuela’s secret mojo marinade chicken breast served with velvety sweet potato mash and grilled asparagus.",
      cals: 390,
      prot: "45g",
      carb: "28g",
      fat: "9g",
      tag: "Family Recipe",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAVIukjTuyaRP8VI8bfie5ijbvG21pc0jbLP5g8qGDkVNMHfy5KfGRvdTjCSm_RYBt-jOJbCIPS6u10chbC3fg_IzJaM8-7eVJLhzQLLR7NuvMTv56Tk6F92Ft8I76tdWeq_h7YDsLRC7irmX7yZ6lZAiwveALScNBBNJNA3mGI-HjTlreN4uqgrnNi3GPWbT0uw8negHPNKNF1iW2cGaMuvbauZkknSiKsiZltcrrZXRcrmRaZgxyah-XhI8ZqX-bgjByoZi2PJQ",
      category: "Low Carb",
      price: 13.99
    },
    {
      name: "Zesty Quinoa Bowl",
      desc: "Protein-packed quinoa topped with roasted chickpeas, cucumber ribbons, and a house-made sofrito crema.",
      cals: 360,
      prot: "22g",
      carb: "45g",
      fat: "14g",
      tag: "Plant-Powered",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhJTj5d9XFQ7aOmXKKVK5HgoTEwHQyC9kdHsPIqlZTRtc3lN6IXg0w641Mtof7wnZBA29W-ZAQRGroGQdNdGZKvfvSOUJGsLI3ycKcAbXepMpwCjNAj3xX18RALFn7J3ZXthb5IA0i2iOgdnGFiCXS7iVzYXvM4UqoH_x34A84g0IZHjDLHc9stCo5939c0_u5zj9n3FmZAUzK3yRcD5IvtT2czA-upgY0SVycvDndyD2BRqXPHBhMDeunlrDpuOw_cUb9sVICvA",
      category: "Plant-Based",
      price: 12.99
    },
    {
      name: "Ropa Vieja Cauliflower",
      desc: "Slow-cooked flank steak in a savory tomato-based sauce with peppers, served over riced cauliflower.",
      cals: 380,
      prot: "35g",
      carb: "15g",
      fat: "18g",
      tag: "Low Carb",
      img: "https://picsum.photos/seed/ropavieja/800/600",
      category: "Low Carb",
      price: 15.49
    },
    {
      name: "Guava Glazed Pork",
      desc: "Tender pork tenderloin with a sweet and tangy guava glaze, served with black beans and brown rice.",
      cals: 480,
      prot: "40g",
      carb: "42g",
      fat: "12g",
      tag: "Performance",
      img: "https://picsum.photos/seed/guavapork/800/600",
      category: "Performance",
      price: 14.99
    }
  ];

  const sortedMeals = [...meals].sort((a, b) => {
    if (a.category === activeCategory && b.category !== activeCategory) return -1;
    if (a.category !== activeCategory && b.category === activeCategory) return 1;
    return 0;
  });

  return (
    <main className="pt-24 pb-20 max-w-7xl mx-auto px-6">
      <header className="mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Weekly Selection</span>
            <h1 className="font-headline text-5xl md:text-6xl font-extrabold tracking-tight text-on-surface">Fresh From The <span className="text-primary">Kitchen.</span></h1>
          </div>
          <div className="flex gap-2 bg-surface-container-low p-1.5 rounded-full overflow-x-auto no-scrollbar">
            {['Cuban Classics', 'Performance', 'Low Carb', 'Plant-Based'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`${activeCategory === cat ? 'bg-primary text-on-primary' : 'hover:bg-surface-container-high text-on-surface-variant'} px-6 py-2 rounded-full font-bold whitespace-nowrap transition-colors`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <section className="lg:col-span-8">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {sortedMeals.map((meal) => (
                <motion.div
                  key={meal.name}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`bg-surface-container-lowest rounded-lg overflow-hidden group shadow-[0_40px_60px_-15px_rgba(36,48,54,0.06)] border-2 transition-colors duration-500 ${meal.category === activeCategory ? 'border-primary/20' : 'border-transparent'}`}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img alt={meal.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" src={meal.img} referrerPolicy="no-referrer" />
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <div className="glass-panel px-3 py-1 rounded-sm text-[10px] font-black text-primary uppercase tracking-widest shadow-sm">{meal.category}</div>
                      <div className="bg-secondary/90 backdrop-blur-md px-3 py-1 rounded-sm text-[10px] font-bold text-on-secondary uppercase tracking-tighter shadow-sm">{meal.tag}</div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-headline text-2xl font-bold text-on-surface mb-2">{meal.name}</h3>
                    <p className="text-on-surface-variant text-sm mb-6 leading-relaxed">{meal.desc}</p>
                    <div className="grid grid-cols-4 gap-2 mb-8">
                      <div className="bg-surface-container-low p-2 rounded text-center">
                        <span className="block text-[10px] font-bold text-on-surface-variant uppercase">Cals</span>
                        <span className="font-headline font-bold text-primary">{meal.cals}</span>
                      </div>
                      <div className="bg-secondary-container p-2 rounded text-center">
                        <span className="block text-[10px] font-bold text-on-secondary-container uppercase">Prot</span>
                        <span className="font-headline font-bold text-secondary-dim">{meal.prot}</span>
                      </div>
                      <div className="bg-surface-container-low p-2 rounded text-center">
                        <span className="block text-[10px] font-bold text-on-surface-variant uppercase">Carb</span>
                        <span className="font-headline font-bold text-on-surface">{meal.carb}</span>
                      </div>
                      <div className="bg-surface-container-low p-2 rounded text-center">
                        <span className="block text-[10px] font-bold text-on-surface-variant uppercase">Fat</span>
                        <span className="font-headline font-bold text-on-surface">{meal.fat}</span>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => addToCart(meal)}
                      className="w-full py-4 bg-surface-container-highest text-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-primary hover:text-on-primary transition-all duration-300"
                    >
                      <span className="material-symbols-outlined">add_circle</span>
                      Quick Add
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        <aside className="lg:col-span-4">
          <div className="sticky top-28 space-y-6">
            <div className="bg-surface-container-lowest p-8 rounded-lg shadow-[0_40px_60px_-15px_rgba(36,48,54,0.06)] border border-surface-container">
              <div className="flex items-center justify-between mb-8">
                <h2 className="font-headline text-2xl font-extrabold text-on-surface">Your Box</h2>
                <div className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-xs font-bold">
                  {totalMeals} {totalMeals === 1 ? 'MEAL' : 'MEALS'}
                </div>
              </div>
              <div className="space-y-6 mb-8 min-h-[120px]">
                <AnimatePresence mode="popLayout">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <motion.div
                        key={item.name}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex gap-4 items-center group"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container shadow-sm">
                          <img src={item.img} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-sm text-on-surface leading-tight max-w-[120px]">{item.name}</h4>
                            <button 
                              onClick={() => removeFromCart(item.name)}
                              className="text-on-surface-variant hover:text-error transition-colors p-1"
                            >
                              <span className="material-symbols-outlined text-sm">delete</span>
                            </button>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center bg-surface-container rounded-full px-2 py-1 gap-3">
                              <button 
                                onClick={() => updateQuantity(item.name, -1)}
                                className="w-5 h-5 flex items-center justify-center hover:bg-surface-container-high rounded-full text-primary transition-colors"
                              >
                                <span className="material-symbols-outlined text-xs">remove</span>
                              </button>
                              <span className="text-xs font-black text-on-surface w-4 text-center">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.name, 1)}
                                className="w-5 h-5 flex items-center justify-center hover:bg-surface-container-high rounded-full text-primary transition-colors"
                              >
                                <span className="material-symbols-outlined text-xs">add</span>
                              </button>
                            </div>
                            <span className="font-black text-primary text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-10 border-2 border-dashed border-surface-container-highest rounded-xl flex flex-col items-center justify-center gap-3"
                    >
                      <span className="material-symbols-outlined text-surface-container-highest text-4xl">shopping_basket</span>
                      <p className="text-on-surface-variant text-sm italic">Your box is empty.<br/>Quick add a meal to start!</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <div className="border-t border-surface-container pt-6 space-y-3">
                <div className="flex justify-between text-sm text-on-surface-variant">
                  <span>Subtotal</span>
                  <span className="font-bold text-on-surface">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-on-surface-variant">
                  <span>Shipping</span>
                  <span className="text-secondary font-bold uppercase tracking-widest text-[10px]">Free</span>
                </div>
                <div className="flex justify-between text-lg font-black text-on-surface pt-2">
                  <span>Total</span>
                  <span className="text-primary">${subtotal.toFixed(2)}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={cart.length === 0}
                onClick={() => navigate('/checkout')}
                className={`w-full mt-8 py-4 rounded-full font-bold text-lg shadow-lg transition-all ${cart.length > 0 ? 'hero-gradient text-on-primary' : 'bg-surface-container-highest text-on-surface-variant cursor-not-allowed'}`}
              >
                Checkout Now
              </motion.button>
            </div>
            <div className="bg-secondary-dim p-6 rounded-lg text-on-secondary">
              <div className="flex items-start gap-4">
                <span className="material-symbols-outlined text-3xl">eco</span>
                <div>
                  <h4 className="font-headline font-bold text-lg mb-1">Miami Fresh Guarantee</h4>
                  <p className="text-xs opacity-80 leading-relaxed">Locally sourced ingredients, cooked fresh, and delivered cold to your doorstep within 24 hours of preparation.</p>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
