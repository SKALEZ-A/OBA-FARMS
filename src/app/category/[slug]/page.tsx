'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { products, categories, formatPrice, getCategoryBySlug, getProductsByCategory } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';

export default function CategoryPage() {
  const params = useParams();
  const router = useRouter();
  const categorySlug = params.slug as string;
  
  const category = getCategoryBySlug(categorySlug);
  const [sortOption, setSortOption] = useState<'popular' | 'price-low' | 'price-high' | 'newest'>('popular');
  const [showFilters, setShowFilters] = useState(false);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display font-bold text-2xl text-leaf-900 mb-4">
            Category not found
          </h1>
          <Button variant="primary" onClick={() => router.push('/shop')}>
            Back to shop
          </Button>
        </div>
      </div>
    );
  }

  const categoryProducts = getProductsByCategory(categorySlug);

  const filteredProducts = useMemo(() => {
    let filtered = [...categoryProducts];

    // Sort
    switch (sortOption) {
      case 'price-low':
        filtered.sort((a, b) => {
          const minA = Math.min(...a.variants.map(v => v.price));
          const minB = Math.min(...b.variants.map(v => v.price));
          return minA - minB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const minA = Math.min(...a.variants.map(v => v.price));
          const minB = Math.min(...b.variants.map(v => v.price));
          return minB - minA;
        });
        break;
      case 'newest':
        filtered.sort((a, b) => {
          const aNew = a.tags.includes('new');
          const bNew = b.tags.includes('new');
          return aNew === bNew ? 0 : aNew ? -1 : 1;
        });
        break;
      default:
        // Popular - bestsellers first
        filtered.sort((a, b) => {
          const aBest = a.tags.includes('bestseller');
          const bBest = b.tags.includes('bestseller');
          return aBest === bBest ? 0 : aBest ? -1 : 1;
        });
    }

    return filtered;
  }, [categoryProducts, sortOption]);

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm font-body text-leaf-900 opacity-70">
          <Link href="/" className="hover:text-leaf-700 transition-colors">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-leaf-900">{category.name}</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-leaf-900 mb-2">
            {category.name}
          </h1>
          <p className="font-body text-base text-leaf-900 opacity-70 mb-4">
            {category.description}
          </p>
          <p className="font-body text-sm text-leaf-900 opacity-60">
            {filteredProducts.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white border border-husk-400 rounded-lg p-6 space-y-6">
              {/* Price Range Filter */}
              <div>
                <h3 className="font-display font-semibold text-lg text-leaf-900 mb-4">
                  Price
                </h3>
                <div className="space-y-4">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="5000"
                    value="100000"
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm font-body text-leaf-900">
                    <span>{formatPrice(0)}</span>
                    <span>{formatPrice(100000)}</span>
                  </div>
                </div>
              </div>

              {/* In Stock Filter */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-husk-400 text-leaf-700 focus:ring-leaf-700"
                  />
                  <span className="font-body text-sm text-leaf-900">
                    In stock
                  </span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Options */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 font-body font-semibold text-leaf-900"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>

              <div className="flex items-center gap-2">
                <label htmlFor="sort" className="font-body text-sm text-leaf-900">
                  Sort:
                </label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as any)}
                  className="px-3 py-2 border border-husk-400 rounded-lg font-body text-sm text-leaf-900 focus:outline-none focus:ring-2 focus:ring-leaf-700"
                >
                  <option value="popular">Popular</option>
                  <option value="price-low">Price: Low to high</option>
                  <option value="price-high">Price: High to low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="font-body text-lg text-leaf-900 mb-4">
                  No products in this category yet.
                </p>
                <Button variant="primary" onClick={() => router.push('/shop')}>
                  Browse all products
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}