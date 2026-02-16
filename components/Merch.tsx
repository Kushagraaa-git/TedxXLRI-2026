import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Plus } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { MERCH_PRICE } from '../constants';

const Merch: React.FC = () => {
  const [view, setView] = useState<'FRONT' | 'BACK'>('FRONT');
  const [customName, setCustomName] = useState('');
  const [quote, setQuote] = useState('');
  const [size, setSize] = useState('M');
  const { addMerch } = useCart();

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    if(!customName.trim() || !quote.trim()) {
        alert("Please fill in all customization fields.");
        return;
    }
    addMerch({
      customName,
      favoriteQuote: quote,
      size,
      quantity: 1
    });
    setCustomName('');
    setQuote('');
  };

  return (
    <section id="merch" className="py-24 bg-zinc-900 overflow-hidden relative">
      {/* Decorative background text */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
         <div className="text-[20vw] font-black text-white leading-none whitespace-nowrap absolute -top-20 -left-20">MERCH</div>
         <div className="text-[20vw] font-black text-white leading-none whitespace-nowrap absolute bottom-0 right-0 transform rotate-180">DESIGN</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Product Preview */}
          <div className="relative group">
             <div className="absolute inset-0 bg-tedRed/20 blur-3xl rounded-full transform scale-75 group-hover:scale-90 transition-transform duration-700" />
             
             <div className="relative bg-black border border-zinc-800 rounded-3xl p-8 aspect-square flex items-center justify-center">
                <div className="absolute top-4 right-4 z-20">
                    <button 
                        onClick={() => setView(view === 'FRONT' ? 'BACK' : 'FRONT')}
                        className="bg-white/10 hover:bg-white/20 p-2 rounded-full text-white backdrop-blur-sm transition-colors"
                        title="Rotate View"
                    >
                        <RotateCcw className="w-5 h-5" />
                    </button>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={view}
                        initial={{ opacity: 0, rotateY: 90 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: -90 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full flex items-center justify-center"
                    >
                        {/* CSS T-Shirt Approximation */}
                        <div className="relative w-3/4 h-3/4 bg-zinc-900 shadow-2xl rounded-t-[30%] relative">
                            {/* Sleeves */}
                            <div className="absolute -left-1/4 top-0 w-1/4 h-1/2 bg-zinc-900 skew-y-[20deg] origin-top-right rounded-l-lg border-l border-t border-zinc-800" />
                            <div className="absolute -right-1/4 top-0 w-1/4 h-1/2 bg-zinc-900 skew-y-[-20deg] origin-top-left rounded-r-lg border-r border-t border-zinc-800" />
                            
                            {/* Body */}
                            <div className="w-full h-full bg-zinc-900 border border-zinc-700 relative flex flex-col items-center justify-center overflow-hidden rounded-lg">
                                
                                {view === 'FRONT' ? (
                                    <div className="text-center">
                                        <div className="text-tedRed font-bold text-2xl tracking-tighter mb-2">TEDx<span className="text-white">XLRI</span></div>
                                        <div className="text-[10px] text-gray-500 uppercase tracking-[0.3em]">Official Merch</div>
                                    </div>
                                ) : (
                                    <div className="relative w-full h-full flex flex-col items-center justify-center p-6">
                                         {/* Topographic X */}
                                         <div className="absolute inset-0 opacity-20">
                                            <svg width="100%" height="100%">
                                                <pattern id="pattern-x" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                                    <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="#E62B1E" strokeWidth="1" fill="none"/>
                                                </pattern>
                                                <rect width="100%" height="100%" fill="url(#pattern-x)" />
                                            </svg>
                                         </div>
                                         <div className="relative z-10 text-center">
                                            <h3 className="text-4xl font-black text-tedRed opacity-80 mb-2">X</h3>
                                            <p className="text-xs font-mono text-white break-words max-w-[150px] mx-auto opacity-70">
                                                "{quote || 'YOUR QUOTE HERE'}"
                                            </p>
                                            <p className="mt-4 text-[10px] font-bold text-zinc-500 uppercase">
                                                {customName || 'YOUR NAME'}
                                            </p>
                                         </div>
                                    </div>
                                )}
                            </div>
                            
                            {/* Collar */}
                            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-1/3 h-8 bg-black rounded-b-full border-b border-zinc-700" />
                        </div>
                    </motion.div>
                </AnimatePresence>
             </div>
             <div className="text-center mt-4">
                 <span className="text-zinc-500 text-sm font-mono">{view} VIEW</span>
             </div>
          </div>

          {/* Configuration Form */}
          <div>
            <h2 className="text-4xl font-black text-white mb-2">Official Custom Oversized Tee</h2>
            <p className="text-tedRed font-bold text-2xl mb-6">₹{MERCH_PRICE}</p>
            <p className="text-gray-400 mb-8 leading-relaxed">
                Made from premium 280 GSM cotton. Designed to blur the lines between streetwear and intellectual statement. Fully customizable with your identity.
            </p>

            <form onSubmit={handleAddToCart} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Custom Name</label>
                    <input 
                        type="text" 
                        value={customName}
                        onChange={(e) => setCustomName(e.target.value)}
                        placeholder="e.g. ARYA STARK"
                        className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-tedRed focus:ring-1 focus:ring-tedRed outline-none transition-all placeholder-zinc-700"
                        maxLength={20}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Favorite Quote</label>
                    <input 
                        type="text" 
                        value={quote}
                        onChange={(e) => setQuote(e.target.value)}
                        placeholder="e.g. God is a woman & a designer"
                        className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-white focus:border-tedRed focus:ring-1 focus:ring-tedRed outline-none transition-all placeholder-zinc-700"
                        maxLength={50}
                    />
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Size</label>
                    <div className="flex space-x-4">
                        {['S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                            <button
                                key={s}
                                type="button"
                                onClick={() => setSize(s)}
                                className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold transition-all ${
                                    size === s 
                                        ? 'bg-white text-black scale-110 shadow-lg' 
                                        : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700'
                                }`}
                            >
                                {s}
                            </button>
                        ))}
                    </div>
                </div>

                <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full bg-tedRed text-white font-bold py-4 rounded-xl flex items-center justify-center hover:bg-red-700 transition-colors shadow-lg shadow-red-900/20"
                >
                    <Plus className="w-5 h-5 mr-2" /> Add to Cart
                </motion.button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

import { AnimatePresence } from 'framer-motion';
export default Merch;