/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import OurStory from './pages/OurStory';
import Menu from './pages/Menu';
import Auth from './pages/Auth';
import Checkout from './pages/Checkout';
import { FirebaseProvider } from './contexts/FirebaseContext';
import { CartProvider } from './contexts/CartContext';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <FirebaseProvider>
      <CartProvider>
        <Router>
          <ScrollToTop />
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/our-story" element={<OurStory />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/checkout" element={<Checkout />} />
              </Routes>
            </div>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </FirebaseProvider>
  );
}
