# E-commerce Frontend

A modern e-commerce frontend built with Next.js 14, TypeScript, and TailwindCSS.

## Features

- 🛍️ **Product Catalog** - Browse and search products
- 🛒 **Shopping Cart** - Add items and manage cart
- 💳 **Checkout Process** - Secure checkout flow
- 👤 **User Profile** - Account management
- ⭐ **Product Reviews** - Customer reviews and ratings
- 🤖 **Chat Support** - Interactive chatbot widget
- 📱 **Responsive Design** - Mobile-first approach
- 🎨 **Modern UI** - Clean and intuitive interface

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Icons**: Heroicons
- **Font**: Inter

## Project Structure

```
ecommerce/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage
│   ├── products/          # Product listing
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── profile/           # User profile
│   └── layout.tsx         # Root layout
├── components/            # Reusable UI components
│   ├── Navbar.tsx        # Navigation bar
│   ├── Footer.tsx        # Site footer
│   ├── ProductCard.tsx   # Product display card
│   ├── RecommendationCarousel.tsx # Featured products
│   ├── ReviewCard.tsx    # Customer reviews
│   └── ChatbotWidget.tsx # Support chatbot
├── lib/                   # Utility functions
│   ├── api.ts            # API client and utilities
│   └── services.ts       # API service functions
├── types/                 # TypeScript interfaces
│   └── index.ts          # Type definitions
├── styles/               # Global styles
│   └── globals.css       # TailwindCSS and custom styles
└── Configuration files
```

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## Features Overview

### 🏠 Homepage
- Hero section with call-to-action
- Featured products carousel
- Company features showcase
- Newsletter signup

### 🛍️ Products Page
- Product grid with filtering
- Search functionality
- Category filtering
- Sorting options
- Pagination

### 🛒 Shopping Cart
- Cart item management
- Quantity updates
- Price calculations
- Order summary
- Secure checkout button

### 💳 Checkout Process
- Multi-step checkout form
- Shipping information
- Payment details
- Order review
- Security badges

### 👤 User Profile
- Profile information editing
- Order history
- Address management
- Wishlist
- Account settings

### 🤖 Chatbot Widget
- Interactive customer support
- Quick response buttons
- Message history
- Minimizable interface

## Customization

### Colors
The project uses a custom color palette defined in `tailwind.config.js`:
- Primary: Blue tones
- Secondary: Gray tones
- Accent colors for success, error, warning

### Components
All components are built with TailwindCSS utility classes and can be easily customized by modifying the class names.

### API Integration
The project includes placeholder API functions in `lib/services.ts`. Replace these with actual API endpoints when connecting to your backend.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

