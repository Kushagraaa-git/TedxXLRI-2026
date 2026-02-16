import { TicketConfig, Goodie } from './types';

export const REGULAR_TICKET: TicketConfig = {
  id: 'ticket-reg',
  type: 'REGULAR',
  name: 'Regular Pass',
  price: 199,
  description: 'Experience the ideas worth spreading.',
  includes: ['Entry to Event', 'Standard Seating', 'Networking Access'],
  goodies: [
    { name: 'TEDx Notebook', icon: 'Book' },
    { name: 'Official Pen', icon: 'Pen' },
    { name: 'Abhibus Voucher (₹500)', icon: 'Ticket' },
  ],
};

export const PREMIUM_TICKET: TicketConfig = {
  id: 'ticket-prem',
  type: 'PREMIUM',
  name: 'Premium Pass',
  price: 399,
  description: 'Elevate your experience with exclusive perks.',
  includes: ['Priority Entry', 'Front Row Seating', 'VIP Networking', 'Speaker Meet & Greet'],
  goodies: [
    { name: 'Premium TEDx Notebook', icon: 'BookOpen' },
    { name: 'Luxury Pen', icon: 'PenTool' },
    { name: 'Abhibus Voucher (₹1000)', icon: 'Ticket' },
    { name: 'Official Black TEDx Mug', icon: 'Coffee' },
  ],
};

export const COMBO_TICKET: TicketConfig = {
  id: 'ticket-combo',
  type: 'COMBO',
  name: 'All-In Combo',
  price: 699,
  description: 'The ultimate package. Premium experience plus official style.',
  includes: ['Everything in Premium', 'Official Oversized Tee', 'Exclusive Badge', 'Front Row Seating'],
  goodies: [
    { name: 'Official Custom Tee', icon: 'Shirt' },
    { name: 'Premium Goodie Bag', icon: 'ShoppingBag' },
    { name: 'All Premium Perks', icon: 'Star' },
  ],
};

export const MERCH_PRICE = 399;