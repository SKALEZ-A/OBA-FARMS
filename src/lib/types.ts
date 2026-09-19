import { Product, Variant } from './data';

export type CartItem = {
  productId: string;
  variantId: string;
  quantity: number;
};

export type CartItemWithDetails = CartItem & {
  product: Product;
  variant: Variant;
};

export type Order = {
  id: string;
  items: {
    productId: string;
    variantId: string;
    quantity: number;
    unitPrice: number;
    name: string;
    variantLabel: string;
  }[];
  customer: {
    name: string;
    phone: string;
    email?: string;
  };
  delivery: {
    method: 'delivery' | 'pickup';
    area?: string;
    address?: string;
    landmark?: string;
    slot?: 'morning' | 'afternoon' | 'evening';
    fee: number;
  };
  payment: {
    method: 'paystack' | 'transfer' | 'on_delivery';
    status: 'pending' | 'paid' | 'failed';
    reference?: string;
  };
  subtotal: number;
  total: number;
  status: 'received' | 'packed' | 'out_for_delivery' | 'delivered' | 'cancelled';
  createdAt: string;
};