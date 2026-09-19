import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-leaf-900 text-husk-200 mt-auto">
      <div className="max-w-[1200px] mx-auto px-5 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          {/* Shop */}
          <div>
            <h3 className="font-display font-bold text-base mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/grains" className="text-sm hover:text-white transition-colors">
                  Grains
                </Link>
              </li>
              <li>
                <Link href="/category/oils" className="text-sm hover:text-white transition-colors">
                  Oils
                </Link>
              </li>
              <li>
                <Link href="/category/eggs" className="text-sm hover:text-white transition-colors">
                  Eggs
                </Link>
              </li>
              <li>
                <Link href="/category/fish-seafood" className="text-sm hover:text-white transition-colors">
                  Fish & seafood
                </Link>
              </li>
              <li>
                <Link href="/category/frozen" className="text-sm hover:text-white transition-colors">
                  Frozen foods
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-display font-bold text-base mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/delivery" className="text-sm hover:text-white transition-colors">
                  Delivery areas
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm hover:text-white transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/track" className="text-sm hover:text-white transition-colors">
                  Track order
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="font-display font-bold text-base mb-4">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm hover:text-white transition-colors">
                  Our farms
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-white transition-colors">
                  How we source
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/bulk-orders" className="text-sm hover:text-white transition-colors">
                  Bulk orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Stay in touch */}
          <div>
            <h3 className="font-display font-bold text-base mb-4">Stay in touch</h3>
            <form className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-leaf-700 text-white placeholder-leaf-100 focus:outline-none focus:ring-2 focus:ring-palm-600 text-sm"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 rounded-lg bg-leaf-700 text-white font-body font-semibold text-sm hover:bg-leaf-900 transition-colors"
              >
                Subscribe
              </button>
            </form>
            <div className="mt-4 flex gap-4">
              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-white transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:text-white transition-colors"
              >
                Instagram
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-husk-400 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © 2026 OBA FARMS ·{' '}
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms
            </Link>{' '}
            ·{' '}
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy
            </Link>
          </p>
          <div className="flex items-center gap-4 text-sm opacity-60">
            <span>Paystack</span>
            <span>Verve</span>
            <span>Visa</span>
          </div>
        </div>
      </div>
    </footer>
  );
}