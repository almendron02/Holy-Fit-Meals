import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useCart } from '../contexts/CartContext';
import { useFirebase } from '../contexts/FirebaseContext';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';


export default function Checkout() {
  const { cart, subtotal, clearCart } = useCart();
  const { user, loading: authLoading } = useFirebase();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth?mode=login');
    }
    if (cart.length === 0) {
      navigate('/menu');
    }
  }, [user, authLoading, cart, navigate]);

  const handleCheckout = async () => {
    if (!user) return;
    setLoading(true);
    setError('');

    try {
      // 1. Create a checkout session on the server
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          successUrl: `${window.location.origin}/checkout?status=success`,
          cancelUrl: `${window.location.origin}/checkout?status=cancel`,
        }),
      });

      const session = await response.json();

      if (session.error) {
        throw new Error(session.error);
      }

      // 2. Redirect to Stripe Checkout
      if (session.url) {
        window.location.href = session.url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Handle success/cancel from Stripe
  const [searchParams] = useState(new URLSearchParams(window.location.search));
  const status = searchParams.get('status');

  useEffect(() => {
    if (status === 'success' && user && cart.length > 0) {
      const saveOrder = async () => {
        try {
          await addDoc(collection(db, 'orders'), {
            uid: user.uid,
            items: cart,
            total: subtotal,
            status: 'paid',
            createdAt: new Date().toISOString(),
            orderId: Math.random().toString(36).substr(2, 9)
          });
          clearCart();
          navigate('/menu');
        } catch (err) {
          console.error('Error saving order:', err);
        }
      };
      saveOrder();
    }
  }, [status, user, cart, subtotal, clearCart, navigate]);

  if (authLoading || (status === 'success' && cart.length > 0)) {
    return (
      <div className="pt-32 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-on-surface-variant">Processing...</p>
      </div>
    );
  }

  return (
    <main className="pt-32 pb-20 max-w-4xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div>
          <h1 className="font-headline text-4xl font-black text-on-surface mb-8">Review Your Box</h1>
          <div className="space-y-6">
            {cart.map((item) => (
              <div key={item.name} className="flex gap-4 items-center bg-surface-container-low p-4 rounded-xl">
                <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />
                <div className="flex-grow">
                  <h3 className="font-bold text-on-surface">{item.name}</h3>
                  <p className="text-sm text-on-surface-variant">Qty: {item.quantity}</p>
                </div>
                <span className="font-black text-primary">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-surface-container-lowest p-8 rounded-2xl shadow-xl border border-surface-container h-fit">
          <h2 className="font-headline text-2xl font-bold text-on-surface mb-6">Order Summary</h2>
          <div className="space-y-4 mb-8">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal</span>
              <span className="font-bold text-on-surface">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Shipping</span>
              <span className="text-secondary font-bold uppercase tracking-widest text-xs">Free</span>
            </div>
            <div className="border-t border-surface-container pt-4 flex justify-between text-xl font-black text-on-surface">
              <span>Total</span>
              <span className="text-primary">${subtotal.toFixed(2)}</span>
            </div>
          </div>

          {error && (
            <div className="bg-error-container text-on-error-container p-4 rounded-lg text-xs font-bold mb-6">
              {error}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleCheckout}
            disabled={loading}
            className="w-full py-4 hero-gradient text-on-primary font-bold rounded-xl shadow-lg disabled:opacity-50"
          >
            {loading ? 'Redirecting to Stripe...' : 'Pay with Stripe'}
          </motion.button>

          <p className="text-center mt-6 text-xs text-on-surface-variant leading-relaxed">
            By clicking "Pay with Stripe", you agree to our Terms of Service and Privacy Policy. Your payment information is processed securely by Stripe.
          </p>
        </div>
      </div>
    </main>
  );
}
