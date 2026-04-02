import React, { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider
} from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export default function Auth() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mode = searchParams.get('mode') || 'login';
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (mode === 'signup') {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(userCredential.user, { displayName: name });
        
        // Create user profile in Firestore
        await setDoc(doc(db, 'users', userCredential.user.uid), {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: name,
          createdAt: new Date().toISOString()
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('/menu');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      
      // Create/Update user profile in Firestore
      await setDoc(doc(db, 'users', result.user.uid), {
        uid: result.user.uid,
        email: result.user.email,
        displayName: result.user.displayName,
        createdAt: new Date().toISOString()
      }, { merge: true });
      
      navigate('/menu');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <main className="pt-32 pb-20 max-w-md mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-surface-container-lowest p-8 rounded-2xl shadow-xl border border-surface-container"
      >
        <h1 className="font-headline text-3xl font-black text-on-surface mb-2">
          {mode === 'signup' ? 'Create Account' : 'Welcome Back'}
        </h1>
        <p className="text-on-surface-variant text-sm mb-8">
          {mode === 'signup' ? 'Join Holy Fit Meals today.' : 'Log in to manage your box.'}
        </p>

        {error && (
          <div className="bg-error-container text-on-error-container p-4 rounded-lg text-xs font-bold mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleAuth} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-black text-on-surface-variant uppercase mb-1.5 ml-1">Full Name</label>
              <input 
                type="text" 
                required 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 bg-surface-container rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-all"
                placeholder="John Doe"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-black text-on-surface-variant uppercase mb-1.5 ml-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="hello@example.com"
            />
          </div>
          <div>
            <label className="block text-xs font-black text-on-surface-variant uppercase mb-1.5 ml-1">Password</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-surface-container rounded-xl border-none focus:ring-2 focus:ring-primary outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
            className="w-full py-4 hero-gradient text-on-primary font-bold rounded-xl shadow-lg mt-4 disabled:opacity-50"
          >
            {loading ? 'Processing...' : (mode === 'signup' ? 'Sign Up' : 'Log In')}
          </motion.button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-surface-container-highest"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-surface-container-lowest px-2 text-on-surface-variant font-bold">Or continue with</span>
          </div>
        </div>

        <button 
          onClick={handleGoogleSignIn}
          className="w-full py-3 bg-white border border-surface-container-highest rounded-xl flex items-center justify-center gap-3 hover:bg-surface-container transition-colors"
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          <span className="text-sm font-bold text-on-surface">Google</span>
        </button>

        <p className="text-center mt-8 text-sm text-on-surface-variant">
          {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
          <button 
            onClick={() => navigate(`/auth?mode=${mode === 'signup' ? 'login' : 'signup'}`)}
            className="text-primary font-bold hover:underline"
          >
            {mode === 'signup' ? 'Log In' : 'Sign Up'}
          </button>
        </p>
      </motion.div>
    </main>
  );
}
