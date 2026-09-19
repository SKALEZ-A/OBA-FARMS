'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatPrice } from '@/lib/data';
import { Button } from '@/components/ui/Button';

export default function OrderConfirmationPage() {
  const params = useParams();
  const router = useRouter();
  const orderId = params.id as string;

  const handleWhatsAppMessage = () => {
    const message = `Hello, I just placed order ${orderId}. I have a question about my order.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/2348000000000?text=${encodedMessage}`, '_blank');
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 bg-stock-ok rounded-full flex items-center justify-center">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-leaf-900 mb-2">
              Order placed!
            </h1>
            <p className="font-body text-base text-leaf-900 opacity-70">
              Thank you for your order. We'll send you a confirmation message shortly.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white border border-husk-400 rounded-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-display font-semibold text-lg text-leaf-900">
                Order {orderId}
              </h2>
              <span className="px-3 py-1 bg-stock-ok text-white text-xs font-body font-semibold rounded-full">
                Received
              </span>
            </div>

            {/* Order Status */}
            <div className="mb-6">
              <div className="flex items-center justify-between text-sm font-body text-leaf-900 mb-2">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-stock-ok" />
                  Received
                </span>
                <span className="flex items-center gap-2 opacity-50">
                  <div className="w-3 h-3 rounded-full bg-husk-400" />
                  Packed
                </span>
                <span className="flex items-center gap-2 opacity-50">
                  <div className="w-3 h-3 rounded-full bg-husk-400" />
                  Out for delivery
                </span>
                <span className="flex items-center gap-2 opacity-50">
                  <div className="w-3 h-3 rounded-full bg-husk-400" />
                  Delivered
                </span>
              </div>
              <div className="h-1 bg-husk-400 rounded-full overflow-hidden">
                <div className="h-full bg-stock-ok w-1/4" />
              </div>
            </div>

            {/* Sample Order Items */}
            <div className="border-t border-husk-400 pt-4 mb-4">
              <h3 className="font-display font-semibold text-base text-leaf-900 mb-3">
                Order items
              </h3>
              <div className="space-y-2 text-sm font-body text-leaf-900">
                <div className="flex justify-between">
                  <span>2 × Smoked catfish (medium)</span>
                  <span className="tabular-nums">{formatPrice(17000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>1 × Crate of eggs (30)</span>
                  <span className="tabular-nums">{formatPrice(5200)}</span>
                </div>
              </div>
            </div>

            {/* Order Total */}
            <div className="border-t border-husk-400 pt-4">
              <div className="flex justify-between font-display font-bold text-lg text-leaf-900">
                <span>Total</span>
                <span className="tabular-nums">{formatPrice(24200)}</span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-white border border-husk-400 rounded-lg p-6 mb-6">
            <h2 className="font-display font-semibold text-lg text-leaf-900 mb-4">
              Delivery information
            </h2>
            <div className="space-y-2 text-sm font-body text-leaf-900">
              <p><span className="font-semibold">Address:</span> 123 Example Street, Yaba, Lagos</p>
              <p><span className="font-semibold">Expected delivery:</span> Within 24 hours</p>
              <p><span className="font-semibold">Contact:</span> +234 801 234 5678</p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <Button
              variant="whatsapp"
              className="w-full"
              onClick={handleWhatsAppMessage}
            >
              Message us about this order
            </Button>
            <Link href="/shop" className="block">
              <Button variant="secondary" className="w-full">
                Continue shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}