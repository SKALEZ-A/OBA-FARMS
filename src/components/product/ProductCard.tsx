'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Product, Variant } from '@/lib/data';
import { formatPrice } from '@/lib/data';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/context/CartContext';

interface ProductCardProps {
  product: Product;
  variant?: Variant;
}

export function ProductCard({ product, variant }: ProductCardProps) {
  const { addItem, getCartCount } = useCart();
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Use the first variant if none specified
  const selectedVariant = variant || product.variants[0];
  const isOutOfStock = selectedVariant.stock === 0;
  const hasDiscount = selectedVariant.compareAtPrice !== undefined && selectedVariant.compareAtPrice > selectedVariant.price;
  const discountPercentage = hasDiscount && selectedVariant.compareAtPrice
    ? Math.round(((selectedVariant.compareAtPrice - selectedVariant.price) / selectedVariant.compareAtPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isOutOfStock) return;
    
    addItem(product.id, selectedVariant.id, 1);
    setAddedToCart(true);
    
    setTimeout(() => {
      setAddedToCart(false);
    }, 1500);
  };

  const getStockStatus = () => {
    if (isOutOfStock) return { label: 'Sold out', color: 'text-stock-out', bg: 'bg-stock-out' };
    if (selectedVariant.stock < 10) return { label: 'Low stock', color: 'text-stock-low', bg: 'bg-stock-low' };
    return { label: 'In stock', color: 'text-stock-ok', bg: 'bg-stock-ok' };
  };

  const stockStatus = getStockStatus();

  return (
    <Link href={`/product/${product.slug}`} className="group">
      <div className="bg-white border border-husk-400 rounded-xl overflow-hidden hover-lift button-press">
        {/* Product Image */}
        <div className="relative aspect-[4/3] bg-husk-200 overflow-hidden">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover"
          />
          
          {hasDiscount && (
            <div className="absolute top-3 left-3 bg-palm-100 text-palm-600 px-2 py-1 rounded-full text-xs font-body font-semibold">
              -{discountPercentage}%
            </div>
          )}
          
          {isOutOfStock && (
            <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
              <span className="text-stock-out font-body font-semibold">Sold out</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-display font-semibold text-base text-leaf-900 line-clamp-2 mb-1 group-hover:text-leaf-700 transition-colors">
            {product.name}
          </h3>
          <p className="text-sm text-leaf-900 opacity-70 mb-2 line-clamp-1">
            {selectedVariant.label}
          </p>
          
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-2">
            <span className="font-display font-bold text-lg text-leaf-900 tabular-nums">
              {formatPrice(selectedVariant.price)}
            </span>
            {hasDiscount && (
              <span className="font-display font-semibold text-sm text-leaf-900 opacity-50 line-through tabular-nums">
                {formatPrice(selectedVariant.compareAtPrice!)}
              </span>
            )}
          </div>

          {/* Stock Status */}
          <div className="flex items-center gap-2 mb-3">
            <div className={`w-2 h-2 rounded-full ${stockStatus.bg}`} />
            <span className={`text-xs font-body font-medium ${stockStatus.color}`}>
              {stockStatus.label}
            </span>
          </div>

          {/* Add to Cart Button */}
          <Button
            variant="primary"
            className="w-full"
            onClick={handleAddToCart}
            disabled={isOutOfStock || addedToCart}
          >
            {addedToCart ? 'Added' : isOutOfStock ? 'Notify me' : 'Add to cart'}
          </Button>
        </div>
      </div>
    </Link>
  );
}