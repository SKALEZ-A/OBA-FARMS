# OBA FARMS - E-commerce Website

## Project Overview
OBA FARMS is a farm produce e-commerce website targeting the Nigerian market, specifically Lagos. The site sells farm staples like rice, oils, eggs, fish, and frozen foods with delivery.

## Tech Stack
- **Framework**: Next.js 16.3.5 (App Router) with TypeScript
- **Styling**: Tailwind CSS 4.3.3 with custom design tokens
- **State Management**: React Context for cart with localStorage persistence
- **Fonts**: Bricolage Grotesque (display) and Public Sans (body) from Google Fonts
- **Package Manager**: pnpm

## Design System
The design follows a farm-inspired color palette:
- **Primary Green**: `--leaf-700` (#1E5631) for navigation and actions
- **Accent Red**: `--palm-600` (#BE3A11) for prices and urgency
- **Background**: `--paper` (#FFFDF8) for page background
- **Typography**: Bricolage Grotesque for headings, Public Sans for body text

## Project Structure
```
src/
├── app/
│   ├── page.tsx (Home page)
│   ├── shop/page.tsx (All products with filters)
│   ├── category/[slug]/page.tsx (Category pages)
│   ├── product/[slug]/page.tsx (Product details)
│   ├── cart/page.tsx (Shopping cart)
│   ├── checkout/page.tsx (Checkout process)
│   ├── order/[id]/page.tsx (Order confirmation)
│   ├── layout.tsx (Root layout with providers)
│   └── globals.css (Global styles and animations)
├── components/
│   ├── layout/
│   │   ├── Header.tsx (Sticky header with navigation)
│   │   └── Footer.tsx (Footer with links)
│   ├── product/
│   │   └── ProductCard.tsx (Product card component)
│   └── ui/
│       ├── Button.tsx (Button variants)
│       └── QuantityStepper.tsx (Quantity input)
├── context/
│   └── CartContext.tsx (Cart state management)
└── lib/
    ├── data.ts (Product data, categories, delivery zones)
    ├── types.ts (TypeScript types)
    └── animations.ts (Animation utilities)
```

## Key Features
- **Product Catalog**: 18+ products across 6 categories
- **Variant System**: Products have multiple variants (sizes, units)
- **Cart Management**: Add/remove items, quantity controls, localStorage persistence
- **Filtering & Sorting**: Category filters, price range, sort options
- **WhatsApp Integration**: Direct ordering via WhatsApp
- **Checkout Process**: Multi-step form with validation
- **Delivery Zones**: Multiple Lagos delivery areas with different fees
- **Payment Options**: Paystack, bank transfer, pay on delivery
- **Responsive Design**: Mobile-first approach
- **Accessibility**: Skip links, ARIA labels, keyboard navigation
- **Animations**: Professional transitions and micro-interactions

## Build Commands
```bash
# Development
pnpm run dev

# Production build
pnpm run build

# Start production server
pnpm run start

# Linting
pnpm run lint
```

## Design Tokens Implementation
All design colors are mapped as CSS custom properties and integrated with Tailwind CSS through the `@theme inline` directive.

## Accessibility Features
- Skip to main content link
- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Reduced motion preferences respected
- Focus indicators on all interactive elements

## Nigeria-Specific Features
- WhatsApp order integration
- Pay on delivery option
- Bank transfer with proof upload
- Delivery zones with per-zone pricing
- Cold chain delivery for frozen items
- Phone number validation for Nigerian formats
- Naira currency formatting

## Performance Considerations
- Static generation where possible
- Optimized images (using SVG placeholders for now)
- CSS animations for smooth performance
- Code splitting with Next.js App Router
- Client-side rendering only when needed (useEffect)

## Next Steps for Production
1. Replace SVG placeholders with real product images
2. Integrate Paystack payment gateway
3. Set up backend API for order processing
4. Implement real inventory management
5. Add user authentication and accounts
6. Implement order tracking system
7. Add SMS/WhatsApp notifications
8. Set up analytics and monitoring