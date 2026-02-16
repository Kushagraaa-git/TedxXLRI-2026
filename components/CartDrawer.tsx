import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, CreditCard, Lock } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { createOrder } from '../services/supabaseService';

const CartDrawer: React.FC = () => {
  const { isOpen, toggleCart, items, removeItem, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'REVIEW' | 'PAYMENT' | 'SUCCESS'>('REVIEW');
  const [loading, setLoading] = useState(false);
  
  // Checkout Form State
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '',
    phone: '',
    room: '',
    batch: ''
  });

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate Supabase/Payment Processing
    const result = await createOrder({
      customerName: formData.name,
      customerEmail: formData.email,
      customerPhone: formData.phone,
      customerRoom: formData.room,
      customerBatch: formData.batch,
      items: items,
      total: cartTotal,
    });

    setLoading(false);
    if (result.success) {
      setPaymentStep('SUCCESS');
      setTimeout(() => {
         clearCart();
         setIsCheckingOut(false);
         setPaymentStep('REVIEW');
         setFormData({ name: '', email: '', phone: '', room: '', batch: '' });
         toggleCart();
      }, 3000);
    } else {
      alert(result.error);
    }
  };

  const BATCH_OPTIONS = [
    "IEV 1st Year",
    "IEV 2nd Year",
    "BM 1st Year",
    "BM 2nd Year",
    "HRM 1st Year",
    "HRM 2nd Year",
    "Other"
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />
          
          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-zinc-900 border-l border-zinc-800 z-50 flex flex-col shadow-2xl"
          >
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h2 className="text-xl font-bold text-white flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2 text-tedRed" />
                Your Cart
              </h2>
              <button onClick={toggleCart} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 && paymentStep !== 'SUCCESS' ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <ShoppingBag className="w-16 h-16 text-zinc-700 mb-4" />
                  <p className="text-gray-500">Your cart is empty.</p>
                  <button 
                    onClick={toggleCart}
                    className="mt-4 text-tedRed font-bold hover:underline"
                  >
                    Go Shopping
                  </button>
                </div>
              ) : paymentStep === 'SUCCESS' ? (
                <div className="h-full flex flex-col items-center justify-center text-center">
                   <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                     <Lock className="w-10 h-10 text-green-500" />
                   </div>
                   <h3 className="text-2xl font-bold text-white mb-2">Payment Successful!</h3>
                   <p className="text-gray-400">Your tickets have been emailed to {formData.email}.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 bg-black/50 p-4 rounded-lg border border-zinc-800">
                      <div className="w-16 h-16 bg-zinc-800 rounded flex items-center justify-center flex-shrink-0">
                         {item.type === 'TICKET' ? (
                            <span className="text-xs font-bold text-tedRed">TICKET</span>
                         ) : (
                            <span className="text-xs font-bold text-white">MERCH</span>
                         )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-white font-bold text-sm truncate">
                          {item.type === 'TICKET' ? `${item.ticketType} Pass` : 'Custom Oversized Tee'}
                        </h4>
                        {item.merchConfig && (
                           <p className="text-xs text-gray-500 mt-1">
                             {item.merchConfig.size} | "{item.merchConfig.customName}"
                           </p>
                        )}
                        <p className="text-tedGold text-sm font-bold mt-2">₹{item.price}</p>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="text-zinc-600 hover:text-red-500 transition-colors h-fit"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && paymentStep !== 'SUCCESS' && (
              <div className="p-6 border-t border-zinc-800 bg-black">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-gray-400">Total</span>
                  <span className="text-2xl font-black text-white">₹{cartTotal}</span>
                </div>

                {!isCheckingOut ? (
                    <button
                        onClick={() => setIsCheckingOut(true)}
                        className="w-full bg-white text-black font-bold py-4 rounded-lg hover:bg-gray-200 transition-colors"
                    >
                        Checkout
                    </button>
                ) : (
                    <form onSubmit={handleCheckout} className="space-y-4">
                        {/* Name */}
                        <input
                            required
                            type="text"
                            placeholder="Full Name"
                            value={formData.name}
                            onChange={e => setFormData({...formData, name: e.target.value})}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white text-sm outline-none focus:border-tedRed"
                        />
                        
                        {/* Email */}
                        <input
                            required
                            type="email"
                            placeholder="Email Address"
                            value={formData.email}
                            onChange={e => setFormData({...formData, email: e.target.value})}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white text-sm outline-none focus:border-tedRed"
                        />

                         {/* Contact Number */}
                         <input
                            required
                            type="tel"
                            placeholder="Contact Number"
                            value={formData.phone}
                            onChange={e => setFormData({...formData, phone: e.target.value})}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white text-sm outline-none focus:border-tedRed"
                        />

                         {/* Room Number */}
                         <input
                            required
                            type="text"
                            placeholder="Room Number"
                            value={formData.room}
                            onChange={e => setFormData({...formData, room: e.target.value})}
                            className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white text-sm outline-none focus:border-tedRed"
                        />

                        {/* Batch Selection */}
                        <div className="relative">
                            <select
                                required
                                value={formData.batch}
                                onChange={e => setFormData({...formData, batch: e.target.value})}
                                className="w-full bg-zinc-900 border border-zinc-700 rounded p-3 text-white text-sm outline-none focus:border-tedRed appearance-none"
                            >
                                <option value="" disabled>Select Batch</option>
                                {BATCH_OPTIONS.map(batch => (
                                    <option key={batch} value={batch}>{batch}</option>
                                ))}
                            </select>
                            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                            </div>
                        </div>
                        
                        {/* Mock Payment UI */}
                        <div className="bg-zinc-900 border border-zinc-700 p-3 rounded flex items-center justify-between mt-6">
                            <div className="flex items-center">
                                <CreditCard className="w-5 h-5 text-gray-400 mr-3" />
                                <span className="text-sm text-gray-400">Card ending in 4242</span>
                            </div>
                            <span className="text-xs font-mono text-tedRed">MOCK</span>
                        </div>

                        <div className="flex gap-3 mt-4">
                            <button
                                type="button"
                                onClick={() => setIsCheckingOut(false)}
                                className="flex-1 py-3 text-sm font-bold text-gray-400 hover:text-white transition-colors"
                            >
                                Back
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-[2] bg-tedRed text-white py-3 rounded font-bold text-sm hover:bg-red-700 transition-colors flex items-center justify-center"
                            >
                                {loading ? (
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    `Pay ₹${cartTotal}`
                                )}
                            </button>
                        </div>
                    </form>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;