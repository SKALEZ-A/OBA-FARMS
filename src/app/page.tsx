import React from 'react';
import Link from 'next/link';
import { categories, products, formatPrice } from '@/lib/data';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const bestsellers = products.filter(p => p.tags.includes('bestseller') && p.isActive).slice(0, 8);
  const freshProducts = products.filter(p => p.isActive).slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-husk-200">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-12 md:py-16 lg:py-24">
          <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-center">
            {/* Hero Content */}
            <div className="lg:col-span-3 space-y-6">
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl text-leaf-900 leading-tight animate-fade-in-up" style={{ animationDelay: '0ms' }}>
                Farm staples, delivered to your door in Lagos
              </h1>
              <p className="font-body text-base md:text-lg text-leaf-900 opacity-80 max-w-xl animate-fade-in-up" style={{ animationDelay: '160ms' }}>
                Rice, oils, eggs and fish bought straight from the farm, priced the same way you buy them at the market.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '320ms' }}>
                <Link href="/shop">
                  <Button variant="primary" className="w-full sm:w-auto button-press">
                    Start shopping
                  </Button>
                </Link>
                <a
                  href="https://wa.me/2348000000000?text=Hello%2C%20I%27d%20like%20to%20place%20an%20order"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" className="w-full sm:w-auto button-press">
                    Order on WhatsApp
                  </Button>
                </a>
              </div>
              
              {/* Today's Prices */}
              <div className="pt-6 border-t border-husk-400">
                <p className="text-sm font-body font-medium text-leaf-900 opacity-60 mb-3">
                  Today's prices
                </p>
                <div className="flex flex-wrap gap-4 text-sm font-body font-semibold text-leaf-900">
                  <span>Crate of eggs {formatPrice(5200)}</span>
                  <span>·</span>
                  <span>50kg rice {formatPrice(78000)}</span>
                  <span>·</span>
                  <span>25L palm oil {formatPrice(46000)}</span>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="lg:col-span-2 relative aspect-square lg:aspect-[4/3] bg-husk-400 rounded-lg overflow-hidden animate-fade-in-up" style={{ animationDelay: '160ms' }}>
              <img 
                src="/images/categories/grains.svg" 
                alt="Farm produce assortment"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-leaf-900 mb-8">
            Shop by category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="relative aspect-square rounded-lg overflow-hidden group"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-leaf-900 opacity-40 group-hover:opacity-30 transition-opacity" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                  <h3 className="font-display font-semibold text-base md:text-lg text-white">
                    {category.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Fresh This Week */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-display font-bold text-2xl md:text-3xl text-leaf-900">
              Fresh this week
            </h2>
            <Link href="/shop">
              <Button variant="secondary">View all</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {freshProducts.map((product, index) => (
              <div key={product.id} className="grid-item" style={{ animationDelay: `${index * 50}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Ordering Works */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-leaf-900 mb-8">
            How ordering works
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-leaf-700 text-white flex items-center justify-center font-display font-bold text-xl">
                1
              </div>
              <h3 className="font-display font-semibold text-lg text-leaf-900">
                Pick your items and quantities
              </h3>
              <p className="font-body text-base text-leaf-900 opacity-70">
                Browse our selection of farm-fresh products and add what you need to your cart.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-leaf-700 text-white flex items-center justify-center font-display font-bold text-xl">
                2
              </div>
              <h3 className="font-display font-semibold text-lg text-leaf-900">
                Pay by card, transfer, or on delivery
              </h3>
              <p className="font-body text-base text-leaf-900 opacity-70">
                Choose your preferred payment method. We support card, bank transfer, and pay on delivery.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-full bg-leaf-700 text-white flex items-center justify-center font-display font-bold text-xl">
                3
              </div>
              <h3 className="font-display font-semibold text-lg text-leaf-900">
                We deliver within 24 hours in Lagos
              </h3>
              <p className="font-body text-base text-leaf-900 opacity-70">
                Fast and reliable delivery to your doorstep. Track your order every step of the way.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-leaf-900 mb-8">
            Bestsellers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {bestsellers.map((product, index) => (
              <div key={product.id} className="grid-item" style={{ animationDelay: `${index * 50}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk and Catering Strip */}
      <section className="py-12 md:py-16 lg:py-24 bg-leaf-700 text-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8 text-center">
          <h2 className="font-display font-bold text-2xl md:text-3xl mb-4">
            Buying for a restaurant, event or shop?
          </h2>
          <p className="font-body text-base mb-6 opacity-90">
            Get wholesale pricing on bulk orders of farm staples.
          </p>
          <Link href="/bulk-orders">
            <Button variant="secondary">Get wholesale pricing</Button>
          </Link>
        </div>
      </section>

      {/* Trust Row */}
      <section className="py-12 md:py-16 lg:py-24">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-leaf-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-leaf-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-body text-sm text-leaf-900">
                Sourced direct from farms
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-leaf-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-leaf-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-body text-sm text-leaf-900">
                Cold-chain delivery for frozen items
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-leaf-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-leaf-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-body text-sm text-leaf-900">
                Pay on delivery available
              </p>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-leaf-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-leaf-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-body text-sm text-leaf-900">
                Same-day dispatch before 2pm
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-12 md:py-16 lg:py-24 bg-white">
        <div className="max-w-[1200px] mx-auto px-5 lg:px-8">
          <h2 className="font-display font-bold text-2xl md:text-3xl text-leaf-900 mb-8">
            What our customers say
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-husk-200 p-6 rounded-lg">
              <p className="font-body text-base text-leaf-900 mb-4">
                "The rice is exactly what I used to buy at the market, but now it's delivered to my door. The quality is excellent."
              </p>
              <p className="font-body text-sm font-semibold text-leaf-900">
                Chioma, Surulere
              </p>
            </div>
            <div className="bg-husk-200 p-6 rounded-lg">
              <p className="font-body text-base text-leaf-900 mb-4">
                "I love that I can order on WhatsApp when I don't feel like using the app. Very convenient for busy days."
              </p>
              <p className="font-body text-sm font-semibold text-leaf-900">
                Emeka, Ikeja
              </p>
            </div>
            <div className="bg-husk-200 p-6 rounded-lg">
              <p className="font-body text-base text-leaf-900 mb-4">
                "The palm oil is authentic and the delivery was fast. Will definitely order again for my restaurant."
              </p>
              <p className="font-body text-sm font-semibold text-leaf-900">
                Fatima, Lekki
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}