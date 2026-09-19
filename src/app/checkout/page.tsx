'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { formatPrice, deliveryZones } from '@/lib/data';
import { Button } from '@/components/ui/Button';

export default function CheckoutPage() {
  const router = useRouter();
  const { getCartTotal, getCartItemsWithDetails, clearCart } = useCart();
  const cartItems = getCartItemsWithDetails();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSection, setExpandedSection] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    // Contact
    name: '',
    phone: '',
    email: '',
    
    // Delivery
    deliveryMethod: 'delivery' as 'delivery' | 'pickup',
    area: '',
    address: '',
    landmark: '',
    deliveryNote: '',
    preferredTime: 'morning' as 'morning' | 'afternoon' | 'evening',
    
    // Payment
    paymentMethod: 'paystack' as 'paystack' | 'transfer' | 'on_delivery',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = getCartTotal();
  const selectedZone = deliveryZones.find(z => z.id === formData.area) || deliveryZones[0];
  const deliveryFee = formData.deliveryMethod === 'delivery' ? selectedZone.fee : 0;
  const total = subtotal + deliveryFee;

  // Handle client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Redirect if cart is empty (only on client)
  useEffect(() => {
    if (isMounted && cartItems.length === 0) {
      router.push('/cart');
    }
  }, [isMounted, cartItems.length, router]);

  if (!isMounted || cartItems.length === 0) {
    return null;
  }

  const validateSection = (sectionIndex: number) => {
    const newErrors: Record<string, string> = {};

    if (sectionIndex === 0) {
      // Contact validation
      if (!formData.name.trim()) {
        newErrors.name = 'Enter your full name';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Enter your phone number';
      } else if (!/^(\+234|0)?[789]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
        newErrors.phone = 'Enter an 11-digit phone number';
      }
    }

    if (sectionIndex === 1) {
      // Delivery validation
      if (formData.deliveryMethod === 'delivery') {
        if (!formData.area) {
          newErrors.area = 'Select your delivery area';
        }
        if (!formData.address.trim()) {
          newErrors.address = 'Enter your street address';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSectionChange = (sectionIndex: number) => {
    if (validateSection(sectionIndex - 1)) {
      setExpandedSection(sectionIndex);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateSection(2)) {
      return;
    }

    setIsSubmitting(true);

    // Simulate order submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Generate order ID
    const orderId = `FM-${new Date().getFullYear().toString().slice(-2)}${(new Date().getMonth() + 1).toString().padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`;

    // Clear cart
    clearCart();

    // Redirect to order confirmation
    router.push(`/order/${orderId}`);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, '');
    
    // Format based on length
    if (cleaned.length === 11) {
      return `0${cleaned.slice(1, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7)}`;
    }
    if (cleaned.length === 13 && cleaned.startsWith('234')) {
      return `+${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 10)} ${cleaned.slice(10)}`;
    }
    
    return value;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    handleInputChange('phone', formatted);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-8">
        <h1 className="font-display font-bold text-3xl md:text-4xl text-leaf-900 mb-8">
          Checkout
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Section 1: Contact */}
              <div className="bg-white border border-husk-400 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedSection(0)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-husk-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                      expandedSection >= 0 ? 'bg-leaf-700 text-white' : 'bg-husk-400 text-leaf-900'
                    }`}>
                      1
                    </div>
                    <h2 className="font-display font-semibold text-lg text-leaf-900">
                      Contact
                    </h2>
                  </div>
                  <svg className={`w-5 h-5 text-leaf-900 transition-transform ${expandedSection === 0 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedSection === 0 && (
                  <div className="px-6 pb-6 space-y-4">
                    <div>
                      <label htmlFor="name" className="block font-body text-sm font-medium text-leaf-900 mb-1">
                        Full name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className="w-full px-4 py-2 border border-husk-400 rounded-lg font-body text-sm text-leaf-900 focus:outline-none focus:ring-2 focus:ring-leaf-700"
                        placeholder="Enter your full name"
                      />
                      {errors.name && <p className="text-sm text-palm-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="phone" className="block font-body text-sm font-medium text-leaf-900 mb-1">
                        Phone number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handlePhoneChange}
                        inputMode="tel"
                        autoComplete="tel"
                        className="w-full px-4 py-2 border border-husk-400 rounded-lg font-body text-sm text-leaf-900 focus:outline-none focus:ring-2 focus:ring-leaf-700"
                        placeholder="0801 234 5678"
                      />
                      {errors.phone && <p className="text-sm text-palm-600 mt-1">{errors.phone}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block font-body text-sm font-medium text-leaf-900 mb-1">
                        Email (optional)
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        inputMode="email"
                        autoComplete="email"
                        className="w-full px-4 py-2 border border-husk-400 rounded-lg font-body text-sm text-leaf-900 focus:outline-none focus:ring-2 focus:ring-leaf-700"
                        placeholder="your@email.com"
                      />
                    </div>

                    <Button
                      type="button"
                      variant="primary"
                      className="w-full"
                      onClick={() => handleSectionChange(1)}
                    >
                      Continue to delivery
                    </Button>
                  </div>
                )}
              </div>

              {/* Section 2: Delivery */}
              <div className="bg-white border border-husk-400 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedSection(1)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-husk-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                      expandedSection >= 1 ? 'bg-leaf-700 text-white' : 'bg-husk-400 text-leaf-900'
                    }`}>
                      2
                    </div>
                    <h2 className="font-display font-semibold text-lg text-leaf-900">
                      Delivery
                    </h2>
                  </div>
                  <svg className={`w-5 h-5 text-leaf-900 transition-transform ${expandedSection === 1 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedSection === 1 && (
                  <div className="px-6 pb-6 space-y-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="delivery"
                          checked={formData.deliveryMethod === 'delivery'}
                          onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                          className="w-4 h-4 text-leaf-700 focus:ring-leaf-700"
                        />
                        <span className="font-body text-sm text-leaf-900">Deliver to me</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="deliveryMethod"
                          value="pickup"
                          checked={formData.deliveryMethod === 'pickup'}
                          onChange={(e) => handleInputChange('deliveryMethod', e.target.value)}
                          className="w-4 h-4 text-leaf-700 focus:ring-leaf-700"
                        />
                        <span className="font-body text-sm text-leaf-900">Pick up at our store</span>
                      </label>
                    </div>

                    {formData.deliveryMethod === 'delivery' && (
                      <>
                        <div>
                          <label htmlFor="area" className="block font-body text-sm font-medium text-leaf-900 mb-1">
                            Area
                          </label>
                          <select
                            id="area"
                            value={formData.area}
                            onChange={(e) => handleInputChange('area', e.target.value)}
                            className="w-full px-4 py-2 border border-husk-400 rounded-lg font-body text-sm text-leaf-900 focus:outline-none focus:ring-2 focus:ring-leaf-700"
                          >
                            <option value="">Select LGA / area</option>
                            {deliveryZones.map((zone) => (
                              <option key={zone.id} value={zone.id}>
                                {zone.name} - {formatPrice(zone.fee)}
                              </option>
                            ))}
                          </select>
                          {errors.area && <p className="text-sm text-palm-600 mt-1">{errors.area}</p>}
                        </div>

                        <div>
                          <label htmlFor="address" className="block font-body text-sm font-medium text-leaf-900 mb-1">
                            Street address
                          </label>
                          <input
                            type="text"
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            className="w-full px-4 py-2 border border-husk-400 rounded-lg font-body text-sm text-leaf-900 focus:outline-none focus:ring-2 focus:ring-leaf-700"
                            placeholder="Enter your street address"
                          />
                          {errors.address && <p className="text-sm text-palm-600 mt-1">{errors.address}</p>}
                        </div>

                        <div>
                          <label htmlFor="landmark" className="block font-body text-sm font-medium text-leaf-900 mb-1">
                            Landmark
                          </label>
                          <input
                            type="text"
                            id="landmark"
                            value={formData.landmark}
                            onChange={(e) => handleInputChange('landmark', e.target.value)}
                            className="w-full px-4 py-2 border border-husk-400 rounded-lg font-body text-sm text-leaf-900 focus:outline-none focus:ring-2 focus:ring-leaf-700"
                            placeholder="Near popular landmark"
                          />
                        </div>

                        <div>
                          <label htmlFor="deliveryNote" className="block font-body text-sm font-medium text-leaf-900 mb-1">
                            Delivery note (optional)
                          </label>
                          <textarea
                            id="deliveryNote"
                            value={formData.deliveryNote}
                            onChange={(e) => handleInputChange('deliveryNote', e.target.value)}
                            rows={2}
                            className="w-full px-4 py-2 border border-husk-400 rounded-lg font-body text-sm text-leaf-900 focus:outline-none focus:ring-2 focus:ring-leaf-700"
                            placeholder="Any special instructions"
                          />
                        </div>

                        <div>
                          <label className="block font-body text-sm font-medium text-leaf-900 mb-2">
                            Preferred time
                          </label>
                          <div className="flex flex-wrap gap-2">
                            {['morning', 'afternoon', 'evening'].map((time) => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => handleInputChange('preferredTime', time)}
                                className={`px-4 py-2 rounded-lg border-2 font-body font-semibold text-sm transition-colors ${
                                  formData.preferredTime === time
                                    ? 'border-leaf-700 bg-leaf-700 text-white'
                                    : 'border-husk-400 text-leaf-900 hover:border-leaf-700'
                                }`}
                              >
                                {time.charAt(0).toUpperCase() + time.slice(1)}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    <Button
                      type="button"
                      variant="primary"
                      className="w-full"
                      onClick={() => handleSectionChange(2)}
                    >
                      Continue to payment
                    </Button>
                  </div>
                )}
              </div>

              {/* Section 3: Payment */}
              <div className="bg-white border border-husk-400 rounded-lg overflow-hidden">
                <button
                  type="button"
                  onClick={() => setExpandedSection(2)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-husk-100 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-display font-bold text-sm ${
                      expandedSection >= 2 ? 'bg-leaf-700 text-white' : 'bg-husk-400 text-leaf-900'
                    }`}>
                      3
                    </div>
                    <h2 className="font-display font-semibold text-lg text-leaf-900">
                      Payment
                    </h2>
                  </div>
                  <svg className={`w-5 h-5 text-leaf-900 transition-transform ${expandedSection === 2 ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {expandedSection === 2 && (
                  <div className="px-6 pb-6 space-y-4">
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paystack"
                          checked={formData.paymentMethod === 'paystack'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="w-4 h-4 text-leaf-700 focus:ring-leaf-700"
                        />
                        <span className="font-body text-sm text-leaf-900">Card or bank transfer (Paystack)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="transfer"
                          checked={formData.paymentMethod === 'transfer'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="w-4 h-4 text-leaf-700 focus:ring-leaf-700"
                        />
                        <span className="font-body text-sm text-leaf-900">Direct bank transfer</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="on_delivery"
                          checked={formData.paymentMethod === 'on_delivery'}
                          onChange={(e) => handleInputChange('paymentMethod', e.target.value)}
                          className="w-4 h-4 text-leaf-700 focus:ring-leaf-700"
                          disabled={!selectedZone.codAllowed || total > 100000}
                        />
                        <span className="font-body text-sm text-leaf-900">
                          Pay on delivery - cash or transfer to rider
                          {(!selectedZone.codAllowed || total > 100000) && (
                            <span className="text-stock-low ml-2">
                              {!selectedZone.codAllowed ? '(not available in your area)' : '(orders above ₦100,000)'}
                            </span>
                          )}
                        </span>
                      </label>
                    </div>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-full"
                      isLoading={isSubmitting}
                    >
                      Place order
                    </Button>
                  </div>
                )}
              </div>
            </form>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-husk-400 rounded-lg p-6 sticky top-24">
              <h2 className="font-display font-semibold text-lg text-leaf-900 mb-4">
                Order summary
              </h2>

              <div className="space-y-3 mb-4">
                {cartItems.map((item) => (
                  <div key={`${item.productId}-${item.variantId}`} className="flex justify-between text-sm">
                    <span className="font-body text-leaf-900">
                      {item.quantity} × {item.product.name}
                    </span>
                    <span className="font-body text-leaf-900 tabular-nums">
                      {formatPrice(item.variant.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-husk-400 pt-3 space-y-3 mb-4">
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

              <div className="text-xs font-body text-leaf-900 opacity-60">
                By placing this order, you agree to our terms and conditions.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}