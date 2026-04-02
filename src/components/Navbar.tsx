import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { useFirebase } from '../contexts/FirebaseContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useFirebase();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Our Story', path: '/our-story' },
  ];

  const handleSignOut = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        <Link to="/" className="text-2xl font-black italic text-primary font-headline uppercase tracking-tight">
          Holy Fit Meals
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`font-headline font-bold uppercase tracking-tight py-1 transition-colors duration-300 ${
                location.pathname === link.path
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-4">
                  <span className="text-sm font-bold text-on-surface hidden sm:block">
                    {user.displayName || user.email}
                  </span>
                  <button 
                    onClick={handleSignOut}
                    className="text-on-surface-variant font-medium font-headline uppercase tracking-tight scale-95 active:scale-90 transition-transform"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <>
                  <Link to="/auth?mode=login">
                    <button className="text-on-surface-variant font-medium font-headline uppercase tracking-tight scale-95 active:scale-90 transition-transform">
                      Log In
                    </button>
                  </Link>
                  <Link to="/auth?mode=signup">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="hero-gradient px-6 py-2.5 rounded-full text-on-primary font-headline font-bold uppercase tracking-tight shadow-md"
                    >
                      Join Now
                    </motion.button>
                  </Link>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
