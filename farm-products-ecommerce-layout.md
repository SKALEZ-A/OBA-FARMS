# Farm Produce Store — Website Layout & Build Spec

A handoff document for an AI coding editor (Cursor, Copilot, Claude Code, etc.).
Everything below is a specification, not code. Build in the order given in §13.

---

## 1. What we are building

An online store that sells farm and food staples to households and small caterers, with delivery.

**Catalogue:** eggs, rice, palm oil, groundnut oil, smoked catfish, frozen foods (chicken, turkey, titus fish), beans, garri, yam, pepper/tomato mix.

**Primary user:** a household buyer or small food vendor who currently buys these in an open market, wants the same goods delivered, and cares about three things in this order — is it fresh, what does it cost today, when will it arrive.

**Primary job of the site:** let someone find a staple, see its price per unit clearly, add it to cart, and check out in under two minutes on a phone.

**Assumptions baked in (change if wrong):**
- Market is Nigeria, delivery starting in Lagos. Currency ₦.
- Mobile-first. Assume 70%+ of traffic is Android on a mid-range phone and a shaky connection.
- Two checkout paths: card/transfer online, and a WhatsApp order handoff. Many buyers will not pay online on a first visit.
- Products are sold in real market units (crate, keg, paint bucket, kg), not abstract "1 item".

---

## 2. Tech stack

Pick per your own preference, but the spec assumes:

| Layer | Suggestion |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| Styling | Tailwind CSS with the tokens in §3 mapped into `tailwind.config` |
| State | React Context or Zustand for cart; cart persists in `localStorage` |
| Data | Start with a typed JSON/TS seed file, move to Postgres (Supabase/Neon) at Phase 3 |
| Images | `next/image`, WebP, lazy-loaded below the fold |
| Payments | Paystack (primary), Flutterwave (fallback), plus bank transfer with manual confirmation |
| Messaging | WhatsApp deep link `https://wa.me/<number>?text=<encoded order>` |

Keep the product data layer behind one module (`lib/products.ts`) so swapping JSON → database touches one file.

---

## 3. Design tokens

### 3.1 Colour

Palette is drawn from the goods themselves — palm oil, leaf, rice husk, smoke — not from a generic template.

```css
:root {
  --leaf-900:  #14231B;  /* ink: all body text, headings */
  --leaf-700:  #1E5631;  /* primary: nav bar, primary buttons, links */
  --leaf-100:  #DCE9DE;  /* primary tint: selected chips, quiet badges */

  --palm-600:  #BE3A11;  /* accent: price emphasis, sale flags, cart badge */
  --palm-100:  #FBE4D8;  /* accent tint: discount pill background */

  --husk-200:  #F0E6D2;  /* section fill, card wells */
  --husk-400:  #D8C7A4;  /* borders, dividers, input outlines */

  --paper:     #FFFDF8;  /* page background */
  --white:     #FFFFFF;  /* card surfaces */

  --stock-ok:  #2F9E44;  /* in stock */
  --stock-low: #B58900;  /* low stock */
  --stock-out: #8A8A85;  /* sold out, disabled */
}
```

Rules:
- Green is for navigation and action. Palm red is for money and urgency only. Never use red for a primary button — it reads as a warning here.
- Product photography carries the colour of the page. Keep chrome quiet so the goods pop.
- Do not add gradients. No gradient hero, no gradient buttons.

### 3.2 Typography

Two families, clearly distinct. Load via Google Fonts with `display=swap` and a real fallback stack.

- **Display — Bricolage Grotesque** (600, 700). Headings, product names, prices.
- **Body — Public Sans** (400, 500, 600). Paragraphs, labels, buttons, form fields.

```
Fallbacks:
  display: 'Bricolage Grotesque', 'Trebuchet MS', system-ui, sans-serif
  body:    'Public Sans', -apple-system, 'Segoe UI', Roboto, sans-serif
```

Type scale (mobile → desktop):

| Role | Size | Weight | Notes |
|---|---|---|---|
| Hero headline | 32px → 52px | Display 700 | line-height 1.05, tight tracking (-0.02em) |
| Section heading | 24px → 32px | Display 700 | line-height 1.15 |
| Product name | 16px → 18px | Display 600 | clamp to 2 lines |
| Price | 18px → 20px | Display 700 | tabular numerals (`font-variant-numeric: tabular-nums`) |
| Body | 16px | Body 400 | line-height 1.6, max 68ch |
| Label / unit | 13px | Body 500 | sentence case |
| Button | 15px | Body 600 | sentence case |

Typography rules — these matter, they are the difference between a real store and a template:
- **Sentence case everywhere.** No ALL-CAPS eyebrow labels above headings.
- No single accented word in a headline (no one word in a different colour).
- Prices always use tabular numerals so column-aligned prices line up.
- Never put an arrow character inside button text. Icons are separate elements.

### 3.3 Spacing, radius, elevation

```
Spacing scale (px):   4  8  12  16  24  32  48  64  96
Section padding:      48 mobile / 96 desktop (vertical)
Container max-width:  1200px, 20px side gutter on mobile
Grid gutter:          16px mobile / 24px desktop

Radius:  buttons & inputs 8px  |  cards 12px  |  images 8px  |  pills 999px
Shadow:  cards use a 1px --husk-400 border, NOT a drop shadow.
         Reserve one shadow for floating elements only:
         0 8px 24px rgba(20,35,27,0.12)  (sticky cart bar, modals, dropdowns)
```

Borders over shadows is a deliberate choice — it keeps the page crisp on low-end screens and avoids the identical-soft-shadow-card look.

---

## 4. Global components

### 4.1 Header

Sticky on scroll. Two rows on desktop, collapses to one row + a search line on mobile.

```
DESKTOP
┌──────────────────────────────────────────────────────────────────────┐
│ [Logo]   [ Search farm products…            🔍 ]   ☎ Call  🛒 Cart(3)│
├──────────────────────────────────────────────────────────────────────┤
│ Shop all  Grains  Oils  Eggs  Fish & seafood  Frozen  Deals          │
└──────────────────────────────────────────────────────────────────────┘

MOBILE
┌──────────────────────────────────┐
│ ☰   [Logo]              🛒 (3)   │
├──────────────────────────────────┤
│ [ Search farm products…      🔍 ]│
└──────────────────────────────────┘
```

- Background `--leaf-700`, text white. Cart badge uses `--palm-600`.
- Search is a real input in the header on every page, not an icon that opens a modal. Discovery is the whole game here.
- Thin strip above the header: "Delivery in Lagos within 24 hours · Free above ₦50,000" — `--husk-200` background, `--leaf-900` text, 13px. Dismissible, remembers dismissal.

### 4.2 Product card

Used in every grid on the site. One component, one look.

```
┌────────────────────────┐
│                        │
│    [product photo]     │  4:3 ratio, object-fit: cover
│                        │
│ ┌──────┐               │  optional pill, top-left over image
│ │ -10% │               │  --palm-100 bg, --palm-600 text
│ └──────┘               │
├────────────────────────┤
│ Smoked catfish         │  display 600, 2-line clamp
│ Medium size, per kg    │  13px, --leaf-900 at 70% opacity
│ ₦8,500  ₦9,500         │  price display 700; old price struck, muted
│ ● In stock             │  dot uses --stock-ok / low / out
│ [   Add to cart    ]   │  full-width, --leaf-700
└────────────────────────┘
```

- The whole card except the button links to the product page.
- On "Add to cart", the button label changes to "Added" for 1.5s, then returns. The cart badge increments. No modal, no page jump.
- Sold out: image at 60% opacity, button becomes "Notify me".

### 4.3 Buttons

| Variant | Use | Style |
|---|---|---|
| Primary | Add to cart, Checkout, Place order | `--leaf-700` fill, white text |
| Secondary | Continue shopping, View all | transparent, 1.5px `--leaf-700` border, `--leaf-700` text |
| WhatsApp | Order on WhatsApp | `#25D366` fill, white text, WhatsApp glyph |
| Quiet | Remove, Cancel | text only, `--leaf-900` 60%, underline on hover |

Minimum touch target 44×44px. Visible keyboard focus ring: 2px `--palm-600`, 2px offset.

### 4.4 Quantity stepper

`[ − ]  2  [ + ]` — 40px tall, bordered, tabular numerals. Minus is disabled at 1. Typing directly into the number is allowed.

### 4.5 Footer

Four columns desktop, stacked accordion mobile.

```
Shop            Help              About            Stay in touch
Grains          Delivery areas    Our farms        [ email input ]
Oils            Returns           How we source    [ Subscribe ]
Eggs            Track order       Contact          WhatsApp · Instagram
Fish & seafood  FAQ               Bulk orders
Frozen foods

──────────────────────────────────────────────────────────────────
© 2026 <Store name> · Terms · Privacy      [Paystack] [Verve] [Visa]
```

Background `--leaf-900`, text `--husk-200`.

---

## 5. Sitemap

```
/                        Home
/shop                    All products (filters + sort)
/category/[slug]         grains | oils | eggs | fish-seafood | frozen | deals
/product/[slug]          Product detail
/cart                    Cart
/checkout                Checkout (3 steps, one page)
/order/[id]              Order confirmation + tracking
/account                 Orders, addresses, profile   (Phase 4)
/bulk-orders             Wholesale / catering enquiry form
/delivery                Delivery areas, fees, timing
/about                   Sourcing story
/contact                 Contact + map
/faq
```

---

## 6. Home page

The hero opens with the goods and today's prices — not a stock photo with a slogan over it. Price transparency is the most characteristic thing in this market, so it leads.

```
┌──────────────────────────────────────────────────────────────────┐
│  HERO — asymmetric, 60/40 split, --husk-200 background            │
│                                                                   │
│  Farm staples, delivered      │  ┌─────────────────────────┐     │
│  to your door in Lagos        │  │                         │     │
│                               │  │   large produce photo   │     │
│  Rice, oils, eggs and fish    │  │   (crate of eggs +      │     │
│  bought straight from the     │  │    rice + palm oil)     │     │
│  farm, priced the same way    │  │                         │     │
│  you buy them at the market.  │  └─────────────────────────┘     │
│                                                                   │
│  [ Start shopping ]  [ Order on WhatsApp ]                        │
│                                                                   │
│  ── today's prices ───────────────────────────────────────────    │
│  Crate of eggs ₦5,200 · 50kg rice ₦78,000 · 25L palm oil ₦46,000  │
│  (horizontal scroll on mobile, static row on desktop)             │
└──────────────────────────────────────────────────────────────────┘
```

Then, in order:

**2. Shop by category** — 6 tiles, 3×2 desktop / 2×3 mobile. Each tile is a photo with the category name over a bottom-aligned dark scrim. No icons.

**3. Fresh this week** — 8 product cards, 4-up desktop / 2-up mobile, with a "View all" secondary button.

**4. How ordering works** — 3 steps. This *is* a sequence, so numbering is correct here.
> 1. Pick your items and quantities · 2. Pay by card, transfer, or on delivery · 3. We deliver within 24 hours in Lagos

**5. Bestsellers** — 8 product cards.

**6. Bulk and catering strip** — full-width `--leaf-700` band. "Buying for a restaurant, event or shop? Get wholesale pricing." + secondary button to `/bulk-orders`.

**7. Trust row** — 4 short items with small icons: sourced direct from farms · cold-chain delivery for frozen items · pay on delivery available · same-day dispatch before 2pm.

**8. Reviews** — 3 short customer quotes with name and area (e.g. "Chioma, Surulere").

Motion: exactly one orchestrated moment — the hero text and image fade up in sequence on load (160ms stagger). Nothing else animates on scroll. Respect `prefers-reduced-motion`.

---

## 7. Shop / category page

```
┌──────────────────────────────────────────────────────────────────┐
│ Home › Oils                                                       │
│ Cooking oils                                                      │
│ Palm oil and groundnut oil in market kegs and bottles.            │
├───────────────┬───────────────────────────────────────────────────┤
│ FILTERS       │  42 products        [ Sort: Popular ▾ ]           │
│               │                                                   │
│ Category      │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│ ☑ Grains      │  │ card │ │ card │ │ card │ │ card │            │
│ ☐ Oils        │  └──────┘ └──────┘ └──────┘ └──────┘            │
│ ☐ Eggs        │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐            │
│               │  │ card │ │ card │ │ card │ │ card │            │
│ Price         │  └──────┘ └──────┘ └──────┘ └──────┘            │
│ ₦0 ——●—— ₦100k│                                                   │
│               │           [ Load more ]                           │
│ Pack size     │                                                   │
│ ☐ Small       │                                                   │
│ ☐ Family      │                                                   │
│ ☐ Bulk        │                                                   │
│               │                                                   │
│ ☐ In stock    │                                                   │
└───────────────┴───────────────────────────────────────────────────┘
```

- Desktop: 4 columns. Tablet: 3. Mobile: 2 columns, filters behind a sticky `[ Filters ]` button that opens a bottom sheet.
- Sort options: Popular, Price low→high, Price high→low, Newest.
- Filters write to the URL query string so a filtered page is shareable and back-button works.
- Empty state: "No products match these filters." + a "Clear filters" button. Never a bare empty grid.

---

## 8. Product detail page

```
┌──────────────────────────────────────────────────────────────────┐
│ Home › Fish & seafood › Smoked catfish                            │
├──────────────────────────────┬───────────────────────────────────┤
│ ┌──────────────────────────┐ │ Smoked catfish                    │
│ │                          │ │ ● In stock · dispatches today     │
│ │      main image          │ │                                   │
│ │                          │ │ ₦8,500  per kg                    │
│ └──────────────────────────┘ │                                   │
│ [thumb][thumb][thumb][thumb] │ Size                              │
│                              │ ( Small ) ( Medium ) ( Large )    │
│                              │                                   │
│                              │ Quantity                          │
│                              │ [ − ]  1  [ + ]   ≈ ₦8,500        │
│                              │                                   │
│                              │ [    Add to cart              ]   │
│                              │ [    Order on WhatsApp        ]   │
│                              │                                   │
│                              │ 🚚 Lagos delivery ₦2,000 ·        │
│                              │    arrives within 24 hours        │
├──────────────────────────────┴───────────────────────────────────┤
│ Description │ How we source │ Storage & shelf life │ Delivery     │
│ ──────────────────────────────────────────────────────────────   │
│ (tab content)                                                     │
├──────────────────────────────────────────────────────────────────┤
│ Often bought together                                             │
│ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐                             │
└──────────────────────────────────────────────────────────────────┘
```

Behaviour:
- Selecting a variant updates price, image, stock status and the URL (`?size=medium`) without a reload.
- The running total next to the stepper updates live. This is important — buyers here compute cost per unit constantly.
- Mobile: image gallery is a swipeable carousel with dots. Price + Add to cart become a sticky bottom bar once the main button scrolls out of view.
- "Storage & shelf life" is required content for frozen and fish products, not optional.

---

## 9. Cart, checkout, confirmation

### 9.1 Cart (`/cart`)

```
┌────────────────────────────────────┬─────────────────────────┐
│ Your cart (3 items)                │ Order summary           │
│                                    │                         │
│ ┌──┐ Smoked catfish, medium        │ Subtotal     ₦21,200    │
│ │img│ ₦8,500 / kg                  │ Delivery      ₦2,000    │
│ └──┘ [−] 2 [+]      ₦17,000  Remove│ ─────────────────────   │
│ ──────────────────────────────────│ Total        ₦23,200    │
│ ┌──┐ Crate of eggs (30)            │                         │
│ │img│ ₦5,200                       │ [  Checkout         ]   │
│ └──┘ [−] 1 [+]       ₦5,200  Remove│ [  Order on WhatsApp]   │
│                                    │                         │
│ [ Continue shopping ]              │ Spend ₦26,800 more for  │
│                                    │ free delivery           │
└────────────────────────────────────┴─────────────────────────┘
```

- Delivery fee recalculates once an area is chosen at checkout; before that show "from ₦2,000".
- Empty cart state: a short line — "Your cart is empty. Start with rice, oil or eggs." — and three category buttons. An empty screen is an invitation to act.
- Cart survives refresh via `localStorage`.

### 9.2 Checkout (`/checkout`)

Single page, three collapsible sections, summary sticky on the right (below the form on mobile). **No forced account creation** — guest checkout is the default, with an optional "Save my details" checkbox at the end.

```
1. Contact
   Full name · Phone (required, used for delivery calls) · Email (optional)

2. Delivery
   ( ) Deliver to me     ( ) Pick up at our store
   Area  [ Select LGA / area ▾ ]     ← sets the delivery fee
   Street address  [                         ]
   Landmark        [                         ]   ← keep this, addresses are informal
   Delivery note   [                         ]
   Preferred time  ( Morning ) ( Afternoon ) ( Evening )

3. Payment
   ( ) Card or bank transfer (Paystack)
   ( ) Direct bank transfer — account shown, upload proof
   ( ) Pay on delivery — cash or transfer to rider
       └ available only in listed areas and below ₦100,000

   [ Place order ]
```

Validation rules:
- Phone: accept `0801…`, `+234801…`, and spaced input; normalise before saving.
- Show errors inline under the field, stating what to fix — "Enter an 11-digit phone number", not "Invalid input".
- Disable "Place order" only while submitting, never as a validation state. Show a spinner and the label "Placing order…".

### 9.3 Confirmation (`/order/[id]`)

Order number, itemised list, total, delivery address, expected window, a "Message us about this order" WhatsApp button prefilled with the order number, and a simple status strip:

```
● Received ──── ○ Packed ──── ○ Out for delivery ──── ○ Delivered
```

Also send the same summary by SMS or WhatsApp. Email alone is not reliable for this audience.

---

## 10. Data model

```ts
type Category = {
  id: string;
  slug: string;            // "oils"
  name: string;            // "Cooking oils"
  description: string;
  image: string;
  sortOrder: number;
};

type Variant = {
  id: string;
  label: string;           // "25 litre keg"
  unit: 'kg' | 'litre' | 'crate' | 'bag' | 'piece' | 'carton' | 'bucket';
  unitValue: number;       // 25
  price: number;           // kobo or naira — pick one and be consistent
  compareAtPrice?: number; // for the struck-through old price
  stock: number;
  sku: string;
  weightKg: number;        // for delivery fee calculation
};

type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;   // one line, used on cards
  description: string;        // markdown, product page
  categoryId: string;
  images: string[];
  variants: Variant[];        // at least one
  sourcing?: string;          // "How we source" tab
  storage?: string;           // REQUIRED for frozen + fish
  requiresColdChain: boolean; // affects delivery options shown
  tags: string[];             // "bestseller", "new", "bulk"
  isActive: boolean;
};

type CartItem = { productId: string; variantId: string; quantity: number };

type Order = {
  id: string;                 // human-readable, e.g. "FM-2409-0143"
  items: (CartItem & { unitPrice: number; name: string; variantLabel: string })[];
  customer: { name: string; phone: string; email?: string };
  delivery: {
    method: 'delivery' | 'pickup';
    area?: string; address?: string; landmark?: string;
    slot?: 'morning' | 'afternoon' | 'evening';
    fee: number;
  };
  payment: { method: 'paystack' | 'transfer' | 'on_delivery'; status: 'pending' | 'paid' | 'failed'; reference?: string };
  subtotal: number; total: number;
  status: 'received' | 'packed' | 'out_for_delivery' | 'delivered' | 'cancelled';
  createdAt: string;
};

type DeliveryZone = { id: string; name: string; fee: number; codAllowed: boolean; etaHours: number };
```

**Seed data to write first** (at least 24 products so grids look real):
- Grains: local rice 50kg/25kg/5kg/paint bucket, foreign rice, beans (oloyin, olotu), garri (ijebu, yellow), yam tubers
- Oils: palm oil 25L/10L/5L/1L, groundnut oil 25L/5L/1L
- Eggs: crate (30), half crate (15), jumbo crate
- Fish & seafood: smoked catfish (small/medium/large, per kg), dried fish, crayfish, stockfish
- Frozen: chicken (whole, laps, wings) per kg and per carton, turkey, titus fish, gizzard
- Deals: bundles — "Soup starter pack", "Monthly family pack"

---

## 11. Nigeria-specific requirements

These are not nice-to-haves. Skipping them will cost conversions.

1. **WhatsApp order path.** Present on product page, cart, and header. Builds a prefilled message:
   `Hello, I'd like to order: 2 × Smoked catfish (medium) — ₦17,000, 1 × Crate of eggs — ₦5,200. Total ₦22,200. My area: Yaba.`
2. **Pay on delivery**, gated by zone and order value. Show it as a real option, not a hidden one.
3. **Bank transfer** with account details displayed plus a proof-of-payment upload.
4. **Delivery zones table** with a per-zone fee, rather than one flat national fee. Free delivery above ₦50,000.
5. **Cold chain flag.** If any cart item has `requiresColdChain: true`, show a notice at checkout: "Frozen items are delivered in cooled packaging. Please be available to receive them." Restrict those items to same-day slots.
6. **Landmark field** on every address form.
7. **Price volatility.** Staple prices move often. Build an admin-editable price field and show a "prices updated <date>" line on `/shop`. Never hardcode prices in components.
8. **Performance budget.** Under 200KB JS on first load, images under 150KB each, LCP under 2.5s on 4G. Compress every product photo.

---

## 12. Responsive, accessibility, quality floor

```
Breakpoints:  sm 640 · md 768 · lg 1024 · xl 1280
Grids:        products 2 → 3 → 4 columns
              categories 2 → 3 → 3
```

- Every image has descriptive `alt` text ("A 25-litre keg of red palm oil", not "product image").
- Colour contrast at least 4.5:1 for body text. Check white on `--leaf-700` and `--palm-600`.
- Full keyboard navigation with a visible focus ring; skip-to-content link first in the DOM.
- Stock status is conveyed by text as well as the coloured dot — never colour alone.
- Forms use real `<label>` elements, correct `inputmode` (`tel`, `email`, `numeric`) and `autocomplete` attributes.
- Respect `prefers-reduced-motion`: disable the hero sequence and all transitions.

---

## 13. Build order

| Phase | Deliverable |
|---|---|
| 1 | Tokens in Tailwind config, fonts loaded, header, footer, button, product card. Static home page with seed data. |
| 2 | `/shop` and `/category/[slug]` with working filters, sort and URL state. `/product/[slug]` with variant switching. |
| 3 | Cart context + `localStorage`, `/cart`, WhatsApp order link end-to-end. |
| 4 | `/checkout` with validation, delivery zones, Paystack integration, `/order/[id]`. |
| 5 | Admin: product CRUD, price edits, stock, order list and status changes. |
| 6 | Accounts, order history, saved addresses, reorder button, reviews. |

Ship Phases 1–3 first and take orders over WhatsApp while payments are being wired up. That gets revenue in before the hardest integration is finished.

---

## 14. Copy rules for the coding editor

Written content is design content. When generating placeholder copy:

- Sentence case for every heading, label and button.
- Buttons say what happens: "Add to cart", "Place order", "Track my order". Not "Submit", not "Click here".
- The same action keeps the same name across the flow: the button says "Place order", the confirmation says "Order placed".
- Errors explain what to fix and never apologise.
- Empty states suggest a next action.
- No filler marketing lines ("premium quality you can trust"). Say the concrete thing: "Dispatched the day it's packed."
