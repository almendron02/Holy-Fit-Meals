import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useFirebase } from '../contexts/FirebaseContext';
import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading } = useFirebase();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Menu', path: '/menu' },
    { name: 'Our Story', path: '/our-story' },
  ];

  const handleSignOut = async () => {
    await signOut(auth);
    setIsMenuOpen(false);
    navigate('/');
  };

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-xl shadow-sm border-b border-outline-variant/30">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4">
        <Link to="/" className="text-xl md:text-2xl font-black italic text-primary font-headline uppercase tracking-tight">
          Holy Fit Meals
        </Link>
        
        {/* Desktop Navigation */}
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

        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Desktop Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-on-surface">
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

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-on-surface-variant focus:outline-none"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <motion.span 
                animate={isMenuOpen ? { rotate: 45, y: 9 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current rounded-full origin-left"
              />
              <motion.span 
                animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-full h-0.5 bg-current rounded-full"
              />
              <motion.span 
                animate={isMenuOpen ? { rotate: -45, y: -9 } : { rotate: 0, y: 0 }}
                className="w-full h-0.5 bg-current rounded-full origin-left"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-outline-variant/30 overflow-hidden"
          >
            <div className="flex flex-col p-6 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-lg font-headline font-bold uppercase tracking-tight transition-colors ${
                    location.pathname === link.path ? 'text-primary' : 'text-on-surface-variant'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-outline-variant/30 flex flex-col space-y-4">
                {!loading && (
                  <>
                    {user ? (
                      <>
                        <div className="text-sm font-bold text-on-surface-variant">
                          Logged in as: <span className="text-on-surface">{user.displayName || user.email}</span>
                        </div>
                        <button 
                          onClick={handleSignOut}
                          className="text-left text-lg font-headline font-bold uppercase tracking-tight text-error"
                        >
                          Log Out
                        </button>
                      </>
                    ) : (
                      <>
                        <Link to="/auth?mode=login" className="text-lg font-headline font-bold uppercase tracking-tight text-on-surface-variant">
                          Log In
                        </Link>
                        <Link to="/auth?mode=signup">
                          <button className="w-full py-4 hero-gradient text-on-primary rounded-xl font-headline font-bold uppercase tracking-tight shadow-lg">
                            Join Now
                          </button>
                        </Link>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
