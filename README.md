# Coffee Shop - Customer Portal

A modern, responsive coffee shop ordering application built with React, Vite, and Tailwind CSS.

## Features

- 🛒 **Shopping Cart** - Add/remove items, update quantities
- 🔐 **User Authentication** - Login and registration
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Beautiful Tailwind CSS design
- 🔍 **Product Search & Filter** - Find products easily
- 📦 **Order Management** - Place and track orders
- 💳 **Order Summary** - Tax and delivery calculations

## Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
2. Navigate to the frontend-user directory
3. Install dependencies:
   ```bash
   npm install
   ```

### Running the Application

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Open your browser and navigate to `http://localhost:3001`

## Project Structure

```
frontend-user/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.jsx      # Navigation header
│   │   ├── Footer.jsx      # Footer component
│   │   ├── ProductCard.jsx # Product display card
│   │   └── CartItem.jsx   # Shopping cart item
│   ├── pages/              # Page components
│   │   ├── Home.jsx        # Landing page
│   │   ├── Menu.jsx        # Product catalog
│   │   ├── Cart.jsx        # Shopping cart
│   │   ├── Login.jsx       # User login
│   │   ├── Register.jsx    # User registration
│   │   └── Profile.jsx     # User profile
│   ├── hooks/              # Custom React hooks
│   │   └── useCart.js      # Cart management hook
│   ├── services/           # API services
│   │   └── api.js         # API client setup
│   ├── utils/              # Utility functions
│   │   └── cartUtils.js    # Cart helper functions
│   ├── App.jsx             # Main app component
│   ├── main.jsx            # App entry point
│   └── index.css          # Global styles
├── public/                # Static assets
├── tailwind.config.js     # Tailwind configuration
├── vite.config.js         # Vite configuration
└── package.json           # Dependencies and scripts
```

## Configuration

### Environment Variables

The application connects to a backend API. Ensure your backend is running and update the API base URL in `src/services/api.js` if needed:

```javascript
const API_BASE_URL = 'http://localhost:8000/api/v1';
```

### Tailwind CSS

The application uses a custom coffee-themed color palette defined in `tailwind.config.js`:

```javascript
colors: {
  coffee: {
    50: '#f7f3f0',
    // ... more shades
    900: '#2b2616',
  }
}
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## API Integration

The application integrates with a FastAPI backend for:

- Authentication (login/register)
- Product catalog
- Order management
- User profiles

## Features in Detail

### Shopping Cart
- Persistent cart using localStorage
- Quantity management
- Real-time price calculations
- Tax and delivery fees
- Free delivery on orders over $50

### User Authentication
- JWT token-based authentication
- Protected routes
- Automatic token refresh
- User profile management

### Product Catalog
- Search functionality
- Category filtering
- Product cards with images
- Add to cart functionality
- Stock status indicators

### Responsive Design
- Mobile-first approach
- Adaptive layouts
- Touch-friendly interfaces
- Optimized for all screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
# Frontend-coffee-User
