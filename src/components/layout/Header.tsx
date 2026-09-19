'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { categories } from '@/lib/data';

export function Header() {
  const { getCartCount } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Check if the announcement bar has been dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem('announcement-dismissed');
    if (dismissed) {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('announcement-dismissed', 'true');
  };

  const cartCount = getCartCount();
  const [animateBadge, setAnimateBadge] = useState(false);

  // Animate badge when cart count changes
  useEffect(() => {
    if (cartCount > 0) {
      setAnimateBadge(true);
      setTimeout(() => setAnimateBadge(false), 200);
    }
  }, [cartCount]);

  return (
    <>
      {/* Announcement Bar */}
      {!isDismissed && (
        <div className="bg-husk-200 text-leaf-900 py-2 px-4 text-center text-sm">
          <span className="inline-flex items-center gap-2">
            Delivery in Lagos within 24 hours · Free above ₦50,000
            <button
              onClick={handleDismiss}
              className="ml-2 text-leaf-900 opacity-60 hover:opacity-100 transition-opacity"
              aria-label="Dismiss announcement"
            >
              ✕
            </button>
          </span>
        </div>
      )}

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-leaf-700 text-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          {/* Top Row */}
          <div className="flex items-center justify-between py-4 gap-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 hover:bg-leaf-900 rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>

            {/* Logo */}
            <Link href="/" className="font-display font-bold text-xl sm:text-2xl">
              OBA FARMS
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search farm products…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 rounded-lg bg-leaf-900 text-white placeholder-leaf-100 focus:outline-none focus:ring-2 focus:ring-palm-600"
                />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-leaf-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4">
              {/* Call Button - Desktop */}
              <a
                href="tel:+2348000000000"
                className="hidden lg:flex items-center gap-2 text-sm font-body font-medium hover:text-leaf-100 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call
              </a>

              {/* Cart */}
              <Link href="/cart" className="relative p-2 hover:bg-leaf-900 rounded-lg transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                {cartCount > 0 && (
                  <span className={`absolute -top-1 -right-1 bg-palm-600 text-white text-xs font-body font-bold w-5 h-5 rounded-full flex items-center justify-center ${animateBadge ? 'cart-badge-pop' : ''}`}>
                    {cartCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Search Bar - Mobile */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search farm products…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-4 pr-10 py-2 rounded-lg bg-leaf-900 text-white placeholder-leaf-100 focus:outline-none focus:ring-2 focus:ring-palm-600"
              />
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-leaf-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Navigation */}
          <nav className={`lg:block ${isMobileMenuOpen ? 'block' : 'hidden'} pb-4 lg:pb-0`}>
            <ul className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-6">
              {categories.map((category) => (
                <li key={category.id}>
                  <Link
                    href={`/category/${category.slug}`}
                    className="block py-2 lg:py-0 text-sm font-body font-medium hover:text-leaf-100 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/shop"
                  className="block py-2 lg:py-0 text-sm font-body font-medium hover:text-leaf-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Shop all
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}