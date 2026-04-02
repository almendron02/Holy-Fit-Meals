import React, { createContext, useContext, useState, useEffect } from 'react';

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

interface CartItem extends Meal {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (meal: Meal) => void;
  updateQuantity: (name: string, delta: number) => void;
  removeFromCart: (name: string) => void;
  clearCart: () => void;
  subtotal: number;
  totalMeals: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (meal: Meal) => {
    setCart(prev => {
      const existing = prev.find(item => item.name === meal.name);
      if (existing) {
        return prev.map(item =>
          item.name === meal.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...meal, quantity: 1 }];
    });
  };

  const updateQuantity = (name: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.name === name) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (name: string) => {
    setCart(prev => prev.filter(item => item.name !== name));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const totalMeals = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, subtotal, totalMeals }}>
      {children}
    </CartContext.Provider>
  );
};
