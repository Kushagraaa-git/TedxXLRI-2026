import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Tickets from './components/Tickets';
import Merch from './components/Merch';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import { CartProvider } from './contexts/CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="bg-black min-h-screen text-white font-sans selection:bg-tedRed selection:text-white">
        <Navbar />
        <main>
          <Hero />
          <Tickets />
          <Merch />
        </main>
        <Footer />
        <CartDrawer />
      </div>
    </CartProvider>
  );
};

export default App;