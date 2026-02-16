import { Order } from '../types';
import { supabase } from '../lib/supabaseClient';

export const createOrder = async (order: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<{ success: boolean; orderId?: string; error?: string }> => {
  try {
    // Check if we're using the placeholder URL by checking the internal URL property or environment
    // @ts-ignore - supabaseUrl is available on the client instance
    const currentUrl = (supabase as any).supabaseUrl || '';
    
    if (currentUrl.includes('placeholder.supabase.co')) {
      console.warn('⚠️ Supabase credentials not configured. Falling back to mock implementation for demo.');
      // Mock delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return { success: true, orderId: `mock-order-${Math.random().toString(36).substr(2, 9)}` };
    }

    const { data, error } = await supabase
      .from('orders')
      .insert([
        {
          customer_name: order.customerName,
          customer_email: order.customerEmail,
          customer_phone: order.customerPhone,
          customer_room: order.customerRoom,
          customer_batch: order.customerBatch,
          items: order.items,
          total: order.total,
          status: 'PAID' // Assuming successful payment for this flow
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      throw error;
    }

    console.log("Order created in Supabase:", data);
    return { success: true, orderId: data.id };
  } catch (error: any) {
    console.error('Error creating order:', error);
    return { success: false, error: error.message || 'Failed to process order. Please try again.' };
  }
};