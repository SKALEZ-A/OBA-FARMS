'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice, deliveryZones } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { QuantityStepper } from '@/components/ui/QuantityStepper';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getCartTotal, getCartItemsWithDetails, clearCart } = useCart();
  const cartItems = getCartItemsWithDetails();
  const deliveryZone = deliveryZones[0]; // Default zone for now
  const deliveryFee = deliveryZone?.fee || 2000;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee;
  const freeDeliveryThreshold = 50000;
  const remainingForFreeDelivery = Math.max(0, freeDeliveryThreshold - subtotal);

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    const itemsText = cartItems
      .map(item => `${item.quantity} × ${item.product.name} (${item.variant.label}) — ${formatPrice(item.variant.price * item.quantity)}`)
      .join(', ');
    
    const message = `Hello, I'd like to order: ${itemsText}. Subtotal: ${formatPrice(subtotal)}, Delivery: ${formatPrice(deliveryFee)}, Total: ${formatPrice(total)}. My area: Lagos.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/2348000000000?text=${encodedMessage}`, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-leaf-900 mb-8">
            Your cart
          </h1>
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-6 bg-husk-200 rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-leaf-900 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h2 className="font-display font-semibold text-xl text-leaf-900 mb-2">
              Your cart is empty
            </h2>
            <p className="font-body text-base text-leaf-900 opacity-70 mb-6">
              Start with rice, oil or eggs to fill your cart.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link href="/category/grains">
                <Button variant="secondary">Grains</Button>
              </Link>
              <Link href="/category/oils">
                <Button variant="secondary">Oils</Button>
              </Link>
              <Link href="/category/eggs">
                <Button variant="secondary">Eggs</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-leaf-900 mb-8">
          Your cart ({cartItems.length} {cartItems.length === 1 ? 'item' : 'items'})
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item.productId}-${item.variantId}`}
                className="bg-white border border-husk-400 rounded-lg p-4 flex gap-4"
              >
                {/* Product Image */}
                <div className="w-24 h-24 bg-husk-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="font-display font-semibold text-base text-leaf-900 hover:text-leaf-700 transition-colors line-clamp-1"
                  >
                    {item.product.name}
                  </Link>
                  <p className="font-body text-sm text-leaf-900 opacity-70 mb-2">
                    {item.variant.label}
                  </p>
                  <p className="font-display font-bold text-lg text-leaf-900 tabular-nums">
                    {formatPrice(item.variant.price)}
                  </p>
                </div>

                {/* Quantity and Actions */}
                <div className="flex flex-col items-end gap-2">
                  <QuantityStepper
                    value={item.quantity}
                    onChange={(value) => updateQuantity(item.productId, item.variantId, value)}
                    min={1}
                    max={item.variant.stock}
                  />
                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="text-sm font-body text-leaf-900 opacity-60 hover:opacity-100 underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="flex items-center justify-between pt-4">
              <Link href="/shop">
                <Button variant="secondary">Continue shopping</Button>
              </Link>
              <button
                onClick={clearCart}
                className="text-sm font-body text-leaf-900 opacity-60 hover:opacity-100 underline"
              >
                Clear cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-husk-400 rounded-lg p-6 sticky top-24">
              <h2 className="font-display font-semibold text-lg text-leaf-900 mb-4">
                Order summary
              </h2>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm font-body text-leaf-900">
                  <span>Subtotal</span>
                  <span className="tabular-nums">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm font-body text-leaf-900">
                  <span>Delivery</span>
                  <span className="tabular-nums">{formatPrice(deliveryFee)}</span>
                </div>
                <div className="border-t border-husk-400 pt-3">
                  <div className="flex justify-between font-display font-bold text-lg text-leaf-900">
                    <span>Total</span>
                    <span className="tabular-nums">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {remainingForFreeDelivery > 0 && (
                <div className="bg-leaf-100 p-3 rounded-lg mb-4">
                  <p className="font-body text-sm text-leaf-900">
                    Spend <span className="font-semibold">{formatPrice(remainingForFreeDelivery)}</span> more for free delivery
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Link href="/checkout" className="block">
                  <Button variant="primary" className="w-full">
                    Checkout
                  </Button>
                </Link>
                <Button
                  variant="whatsapp"
                  className="w-full"
                  onClick={handleWhatsAppOrder}
                >
                  Order on WhatsApp
                </Button>
              </div>

              <div className="mt-4 pt-4 border-t border-husk-400">
                <div className="flex items-center gap-2 text-xs font-body text-leaf-900 opacity-60">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Secure checkout powered by Paystack
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}