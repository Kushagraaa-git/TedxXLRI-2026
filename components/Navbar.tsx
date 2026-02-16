import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Navbar: React.FC = () => {
  const { toggleCart, items } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-2xl font-black tracking-tighter text-white">
              TEDx<span className="text-tedRed">XLRI</span>Delhi
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#tickets" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">Tickets</a>
            <a href="#merch" className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block">Merch</a>
            <button 
              onClick={toggleCart}
              className="relative p-2 text-gray-300 hover:text-white transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {items.length > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-tedRed rounded-full">
                  {items.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;