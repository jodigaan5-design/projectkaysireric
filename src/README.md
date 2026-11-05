LUMI SKIN — E-Commerce Web Application

A responsive, multi-page e-commerce web application for LUMI SKIN built using React, TypeScript, and custom CSS, designed to match 1:1 visual fidelity against Figma specifications.

Key Features

Dynamic Page Navigation:

Homepage: Hero banner, Shop by Category cards, Featured Products grid, and Value Proposition badges.

PLP (Product Listing Page): Complete skincare catalog with category/skin-type sidebar filters, search bar, and sorting controls.

PDP (Product Detail Page): Product view with thumbnail gallery, quantity counter (- / +), bestseller badge, and tabbed specifications (Description, Ingredients, Reviews).

Persistent Shopping Cart Drawer:

Slide-out cart drawer showing item count and real-time total calculation.

localStorage persistence ensuring saved cart items persist upon page reload.

1:1 Visual & UX Design Fidelity:

Precise color palette matching (#f5f2ed background, #e5dacd cards, #6b8268 badges).

Aligned grid layouts and touch-friendly interactive targets (minimum 44px height).

Tech Stack

Frontend: React (TSX)

Language: TypeScript

Styling: CSS3 (Flexbox & CSS Grid)

State Management: React Hooks (useState, useEffect) & localStorage

Environment: CodeSandbox / Vite

Project Structure

lumi-skin-store/
├── public/                      # Product images
│   ├── cleanser.jpg
│   ├── toner.jpg
│   ├── serum.jpg
│   ├── moisturizer.jpg
│   └── sunscreen.jpg
├── src/
│   ├── App.tsx                  # Main application component & routing
│   ├── main.tsx                 # Application entry point
│   └── index.css                # Global design tokens and styles
├── package.json                 # Dependencies and build scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                    # Project documentation

Design System

Primary Text: Dark Charcoal (#222222)

Accent Badges: Muted Green (#6b8268)

Card Background: Soft Nude/Beige (#e5dacd)

Body Background: Warm Off-White (#f5f2ed)