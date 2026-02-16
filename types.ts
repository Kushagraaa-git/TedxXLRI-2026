export type TicketType = 'REGULAR' | 'PREMIUM' | 'COMBO';

export interface Goodie {
  name: string;
  icon: string;
}

export interface TicketConfig {
  id: string;
  type: TicketType;
  name: string;
  price: number;
  description: string;
  includes: string[];
  goodies: Goodie[];
}

export interface MerchandiseConfig {
  customName: string;
  favoriteQuote: string;
  size: string;
  quantity: number;
}

export interface CartItem {
  id: string;
  type: 'TICKET' | 'MERCH';
  ticketType?: TicketType;
  merchConfig?: MerchandiseConfig;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerRoom: string;
  customerBatch: string;
  items: CartItem[];
  total: number;
  status: 'PENDING' | 'PAID';
  createdAt: string;
}