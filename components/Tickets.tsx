import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Ticket as TicketIcon, Book, Pen, BookOpen, PenTool, Coffee, Shirt, ShoppingBag, Star } from 'lucide-react';
import { REGULAR_TICKET, PREMIUM_TICKET, COMBO_TICKET } from '../constants';
import { TicketConfig } from '../types';
import { useCart } from '../contexts/CartContext';

const GoodieIcon: React.FC<{ name: string }> = ({ name }) => {
  const iconProps = { className: "w-5 h-5 mr-3" };
  switch (name) {
    case 'Book': return <Book {...iconProps} />;
    case 'Pen': return <Pen {...iconProps} />;
    case 'Ticket': return <TicketIcon {...iconProps} />;
    case 'BookOpen': return <BookOpen {...iconProps} />;
    case 'PenTool': return <PenTool {...iconProps} />;
    case 'Coffee': return <Coffee {...iconProps} />;
    case 'Shirt': return <Shirt {...iconProps} />;
    case 'ShoppingBag': return <ShoppingBag {...iconProps} />;
    case 'Star': return <Star {...iconProps} />;
    default: return <Check {...iconProps} />;
  }
};

const TicketCard: React.FC<{ 
  config: TicketConfig; 
  showGoodies: boolean; 
  onSelect: () => void 
}> = ({ config, showGoodies, onSelect }) => {
  const isPremium = config.type === 'PREMIUM';
  const isCombo = config.type === 'COMBO';
  
  // Dynamic styles based on card type
  let borderColor = 'border-tedRed/50';
  let hoverBorder = 'hover:border-tedRed';
  let bgColor = 'bg-black';
  let shadow = 'shadow-[0_0_15px_rgba(230,43,30,0.1)]';
  let titleColor = 'text-white';
  let checkColor = 'text-tedRed';
  let btnBg = 'bg-tedRed text-white hover:bg-red-700';

  if (isPremium) {
    borderColor = 'border-tedGold/50';
    hoverBorder = 'hover:border-tedGold';
    bgColor = 'bg-gradient-to-br from-gray-900 to-black';
    shadow = 'shadow-[0_0_15px_rgba(212,175,55,0.1)]';
    titleColor = 'text-tedGold';
    checkColor = 'text-tedGold';
    btnBg = 'bg-tedGold text-black hover:bg-yellow-400';
  } else if (isCombo) {
    borderColor = 'border-white/50';
    hoverBorder = 'hover:border-white';
    bgColor = 'bg-zinc-900';
    shadow = 'shadow-[0_0_20px_rgba(255,255,255,0.1)]';
    titleColor = 'text-white';
    checkColor = 'text-white';
    btnBg = 'bg-white text-black hover:bg-gray-200';
  }

  return (
    <motion.div 
      layout
      className={`relative flex flex-col p-6 rounded-2xl border-2 transition-all duration-300 h-full ${borderColor} ${bgColor} ${hoverBorder} ${shadow}`}
    >
      {isPremium && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-tedGold text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
          Best Value
        </div>
      )}
      {isCombo && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
          Limited Deal
        </div>
      )}
      
      <div className="mb-4">
        <h3 className={`text-2xl font-bold mb-2 ${titleColor}`}>
          {config.name}
        </h3>
        <p className="text-gray-400 text-sm min-h-[40px]">{config.description}</p>
      </div>

      <div className="mb-6">
        <div className="flex items-baseline">
            <span className="text-4xl font-bold text-white">₹{config.price}</span>
        </div>
      </div>

      <div className="flex-grow space-y-3 mb-6">
        {config.includes.map((item, idx) => (
          <div key={idx} className="flex items-start text-gray-300 text-sm">
            <Check className={`w-4 h-4 mr-2 mt-0.5 flex-shrink-0 ${checkColor}`} />
            {item}
          </div>
        ))}
      </div>

      <AnimatePresence>
        {showGoodies && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 overflow-hidden"
          >
            <div className={`p-4 rounded-lg bg-white/5`}>
              <h4 className={`font-bold text-xs uppercase mb-3 ${titleColor}`}>
                Included Goodies
              </h4>
              <ul className="space-y-2">
                {config.goodies.map((goodie, idx) => (
                  <li key={idx} className="flex items-center text-sm text-gray-200">
                    <span className={`${checkColor}`}>
                        <GoodieIcon name={goodie.icon} />
                    </span>
                    {goodie.name}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onSelect}
        className={`w-full py-3 rounded-xl font-bold text-center transition-all ${btnBg}`}
      >
        Select {isCombo ? 'Combo' : isPremium ? 'Premium' : 'Regular'}
      </motion.button>
    </motion.div>
  );
};

const Tickets: React.FC = () => {
  const [showGoodies, setShowGoodies] = useState(true); // Default to showing goodies
  const { addTicket } = useCart();

  return (
    <section id="tickets" className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Secure Your Spot</h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-8">
            Choose the experience that suits you best.
          </p>
          
          <div className="flex flex-col items-center gap-6">
              {/* View Goodies Toggle (Subtle) */}
              <div className="flex items-center space-x-3">
                <span className={`text-xs font-medium ${!showGoodies ? 'text-gray-300' : 'text-gray-600'}`}>Hide Goodies</span>
                <button
                onClick={() => setShowGoodies(!showGoodies)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${showGoodies ? 'bg-zinc-700' : 'bg-zinc-800 border border-zinc-700'}`}
                >
                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition duration-200 ease-in-out ${showGoodies ? 'translate-x-5' : 'translate-x-1'}`} />
                </button>
                <span className={`text-xs font-medium ${showGoodies ? 'text-gray-300' : 'text-gray-600'}`}>Show Goodies</span>
             </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          <TicketCard 
            config={REGULAR_TICKET} 
            showGoodies={showGoodies} 
            onSelect={() => addTicket('REGULAR', REGULAR_TICKET.price)}
          />
          <TicketCard 
            config={PREMIUM_TICKET} 
            showGoodies={showGoodies} 
            onSelect={() => addTicket('PREMIUM', PREMIUM_TICKET.price)}
          />
           <TicketCard 
            config={COMBO_TICKET} 
            showGoodies={showGoodies} 
            onSelect={() => addTicket('COMBO', COMBO_TICKET.price)}
          />
        </div>
      </div>
    </section>
  );
};

export default Tickets;