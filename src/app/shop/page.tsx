'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { products, categories, formatPrice } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';

export default function ShopPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortOption, setSortOption] = useState<'popular' | 'price-low' | 'price-high' | 'newest'>('popular');
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let filtered = products.filter(p => p.isActive);

    // Filter by category
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.categoryId));
    }

    // Filter by price range
    filtered = filtered.filter(p => {
      const minPrice = Math.min(...p.variants.map(v => v.price));
      return minPrice >= priceRange[0] && minPrice <= priceRange[1];
    });

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
  }, [selectedCategories, priceRange, sortOption]);

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setPriceRange([0, 100000]);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm font-body text-leaf-900 opacity-70">
          <Link href="/" className="hover:text-leaf-700 transition-colors">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-leaf-900">Shop all</span>
        </nav>

        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display font-bold text-3xl md:text-4xl text-leaf-900 mb-2">
            Shop all
          </h1>
          <p className="font-body text-base text-leaf-900 opacity-70">
            {filteredProducts.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white border border-husk-400 rounded-lg p-6 space-y-6">
              {/* Category Filter */}
              <div>
                <h3 className="font-display font-semibold text-lg text-leaf-900 mb-4">
                  Category
                </h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="w-4 h-4 rounded border-husk-400 text-leaf-700 focus:ring-leaf-700"
                      />
                      <span className="font-body text-sm text-leaf-900">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

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
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm font-body text-leaf-900">
                    <span>{formatPrice(priceRange[0])}</span>
                    <span>{formatPrice(priceRange[1])}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <Button
                variant="secondary"
                className="w-full"
                onClick={clearFilters}
              >
                Clear filters
              </Button>
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
                  No products match these filters.
                </p>
                <Button variant="secondary" onClick={clearFilters}>
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}