import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, TicketType, MerchandiseConfig } from '../types';
import { REGULAR_TICKET, PREMIUM_TICKET, COMBO_TICKET, MERCH_PRICE } from '../constants';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  toggleCart: () => void;
  addTicket: (type: TicketType, price: number) => void;
  addMerch: (config: MerchandiseConfig) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleCart = () => setIsOpen(prev => !prev);

  const addTicket = (type: TicketType, price: number) => {
    const newItem: CartItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      type: 'TICKET',
      ticketType: type,
      price: price, // Use the dynamic price passed from the component
      quantity: 1,
    };
    setItems(prev => [...prev, newItem]);
    setIsOpen(true);
  };

  const addMerch = (config: MerchandiseConfig) => {
    const newItem: CartItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      type: 'MERCH',
      merchConfig: config,
      price: MERCH_PRICE,
      quantity: config.quantity,
    };
    setItems(prev => [...prev, newItem]);
    setIsOpen(true);
  };

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
  };

  const cartTotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, isOpen, toggleCart, addTicket, addMerch, removeItem, clearCart, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};