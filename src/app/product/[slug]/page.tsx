'use client';

import React, { useState, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getProductBySlug, formatPrice, getProductsByCategory, deliveryZones } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { QuantityStepper } from '@/components/ui/QuantityStepper';
import { useCart } from '@/context/CartContext';
import { ProductCard } from '@/components/product/ProductCard';

export default function ProductPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addItem } = useCart();
  
  const productSlug = params.slug as string;
  const product = getProductBySlug(productSlug);
  
  const [selectedVariantId, setSelectedVariantId] = useState<string>(() => {
    const sizeParam = searchParams.get('size');
    if (sizeParam) {
      const variant = product?.variants.find(v => v.label.toLowerCase().includes(sizeParam.toLowerCase()));
      return variant?.id || product?.variants[0]?.id || '';
    }
    return product?.variants[0]?.id || '';
  });
  
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'sourcing' | 'storage' | 'delivery'>('description');

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl text-leaf-900 mb-4">
            Product not found
          </h1>
          <Button variant="primary" onClick={() => router.push('/shop')}>
            Back to shop
          </Button>
        </div>
      </div>
    );
  }

  const selectedVariant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];
  const categoryProducts = getProductsByCategory(product.categoryId);
  const relatedProducts = categoryProducts.filter(p => p.id !== product.id).slice(0, 4);
  
  const deliveryZone = deliveryZones[0]; // Default zone
  const deliveryFee = deliveryZone?.fee || 2000;
  const totalPrice = selectedVariant.price * quantity;

  const handleVariantChange = (variantId: string) => {
    setSelectedVariantId(variantId);
    const variant = product.variants.find(v => v.id === variantId);
    if (variant) {
      const url = new URL(window.location.href);
      url.searchParams.set('size', variant.label.toLowerCase());
      router.push(url.toString(), { scroll: false });
    }
  };

  const handleAddToCart = () => {
    addItem(product.id, selectedVariant.id, quantity);
  };

  const handleWhatsAppOrder = () => {
    const message = `Hello, I'd like to order: ${quantity} × ${product.name} (${selectedVariant.label}) — ${formatPrice(totalPrice)}. My area: Lagos.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/2348000000000?text=${encodedMessage}`, '_blank');
  };

  const getStockStatus = () => {
    if (selectedVariant.stock === 0) return { label: 'Sold out', color: 'text-stock-out', bg: 'bg-stock-out' };
    if (selectedVariant.stock < 10) return { label: 'Low stock', color: 'text-stock-low', bg: 'bg-stock-low' };
    return { label: 'In stock', color: 'text-stock-ok', bg: 'bg-stock-ok' };
  };

  const stockStatus = getStockStatus();
  const hasDiscount = selectedVariant.compareAtPrice && selectedVariant.compareAtPrice > selectedVariant.price;

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm font-body text-leaf-900 opacity-70">
          <Link href="/" className="hover:text-leaf-700 transition-colors">
            Home
          </Link>
          <span className="mx-2">›</span>
          <Link href={`/category/${product.categoryId}`} className="hover:text-leaf-700 transition-colors">
            {categoryProducts[0]?.name || 'Category'}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-leaf-900">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square bg-husk-200 rounded-lg overflow-hidden">
              <img 
                src={product.images[0]} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className="aspect-square bg-husk-200 rounded-lg overflow-hidden border-2 border-transparent hover:border-leaf-700 transition-colors"
                >
                  <img 
                    src={image} 
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${stockStatus.bg}`} />
                <span className={`text-sm font-body font-medium ${stockStatus.color}`}>
                  {stockStatus.label} · dispatches today
                </span>
              </div>
              <h1 className="font-display font-bold text-2xl md:text-3xl text-leaf-900 mb-2">
                {product.name}
              </h1>
              <p className="font-body text-base text-leaf-900 opacity-70">
                {product.shortDescription}
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="font-display font-bold text-3xl text-leaf-900 tabular-nums">
                {formatPrice(selectedVariant.price)}
              </span>
              <span className="font-body text-sm text-leaf-900 opacity-70">
                per {selectedVariant.unit}
              </span>
              {hasDiscount && (
                <span className="font-display font-semibold text-lg text-leaf-900 opacity-50 line-through tabular-nums">
                  {formatPrice(selectedVariant.compareAtPrice!)}
                </span>
              )}
            </div>

            {/* Variant Selection */}
            {product.variants.length > 1 && (
              <div>
                <h3 className="font-display font-semibold text-lg text-leaf-900 mb-3">
                  Size
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => handleVariantChange(variant.id)}
                      disabled={variant.stock === 0}
                      className={`px-4 py-2 rounded-lg border-2 font-body font-semibold text-sm transition-colors ${
                        selectedVariantId === variant.id
                          ? 'border-leaf-700 bg-leaf-700 text-white'
                          : 'border-husk-400 text-leaf-900 hover:border-leaf-700'
                      } ${variant.stock === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      {variant.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-display font-semibold text-lg text-leaf-900 mb-3">
                Quantity
              </h3>
              <div className="flex items-center gap-4">
                <QuantityStepper
                  value={quantity}
                  onChange={setQuantity}
                  min={1}
                  max={selectedVariant.stock}
                  disabled={selectedVariant.stock === 0}
                />
                <span className="font-display font-bold text-lg text-leaf-900 tabular-nums">
                  ≈ {formatPrice(totalPrice)}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                variant="primary"
                className="w-full"
                onClick={handleAddToCart}
                disabled={selectedVariant.stock === 0}
              >
                Add to cart
              </Button>
              <Button
                variant="whatsapp"
                className="w-full"
                onClick={handleWhatsAppOrder}
              >
                Order on WhatsApp
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="bg-husk-200 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-leaf-700 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                <div>
                  <p className="font-body text-sm text-leaf-900">
                    <span className="font-semibold">Lagos delivery</span> {formatPrice(deliveryFee)} · arrives within 24 hours
                  </p>
                  {product.requiresColdChain && (
                    <p className="font-body text-xs text-leaf-900 opacity-70 mt-1">
                      Cold-chain delivery for this item
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-12">
          <div className="border-b border-husk-400 mb-6">
            <div className="flex gap-8">
              {['description', 'sourcing', 'storage', 'delivery'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`pb-3 font-body font-semibold text-sm transition-colors ${
                    activeTab === tab
                      ? 'text-leaf-700 border-b-2 border-leaf-700'
                      : 'text-leaf-900 opacity-60 hover:opacity-100'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <div className="font-body text-base text-leaf-900 space-y-4">
                <p>{product.description}</p>
              </div>
            )}
            {activeTab === 'sourcing' && product.sourcing && (
              <div className="font-body text-base text-leaf-900 space-y-4">
                <p>{product.sourcing}</p>
              </div>
            )}
            {activeTab === 'storage' && product.storage && (
              <div className="font-body text-base text-leaf-900 space-y-4">
                <p>{product.storage}</p>
              </div>
            )}
            {activeTab === 'delivery' && (
              <div className="font-body text-base text-leaf-900 space-y-4">
                <p>We deliver to all areas in Lagos within 24 hours. Delivery fees vary by location - see our delivery page for details.</p>
                <p>For frozen items and products requiring cold chain, we use insulated packaging to ensure freshness.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-display font-bold text-2xl text-leaf-900 mb-6">
              Often bought together
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}