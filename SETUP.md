# RIMSS - Retail Inventory Management Software System

A modern retail inventory management system built with React, TypeScript, and Tailwind CSS using mock data for demonstration purposes.

## Features

- 🏠 **Home Page** with featured products and special offers
- 🔍 **Product Search & Filtering** by category, price, color, and discounts
- 📱 **Product Showcase** with detailed product information
- 🛒 **Shopping Cart** functionality with quantity management
- 💳 **Payment Integration** with Stripe (mock implementation)
- 🎯 **Latest Offers** system with promotional campaigns
- 👤 **User Authentication** (mock implementation)
- 📋 **Order Management** and history
- 🎨 **Modern UI** with responsive design

## Tech Stack

### Frontend
- **React 18** with TypeScript
- **React Router** for navigation
- **Tailwind CSS** for styling
- **Context API** for state management
- **Mock Data** for demonstration

### Mock Features
- Product catalog with 8 sample products
- User authentication simulation
- Shopping cart with local state
- Order management
- Special offers and promotions
- Payment processing simulation

## Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rimss
   ```

2. **Install dependencies**
   ```bash
   npm run setup
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Project Structure

```
rimss/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React contexts for state management
│   │   ├── data/          # Mock data and types
│   │   ├── pages/         # Page components
│   │   ├── services/      # API service layer (mock)
│   │   └── App.tsx        # Main application component
│   ├── package.json
│   └── tailwind.config.js
├── package.json
└── README.md
```

## Mock Data

The application uses comprehensive mock data including:

### Products
- 8 sample products across different categories
- Realistic product information with images
- Pricing with discount calculations
- Ratings and reviews
- Color and size options

### Users
- Sample user account for testing
- Authentication simulation

### Orders
- Sample order history
- Order status tracking

### Offers
- Special promotional offers
- Discount campaigns

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build for production
- `npm run setup` - Install all dependencies

## Features in Detail

### Product Management
- Browse products with advanced filtering
- Search by name, category, or description
- Filter by price range, color, and discounts
- View detailed product information
- Add products to cart with quantity selection

### Shopping Cart
- Add/remove items
- Update quantities
- View cart total
- Proceed to checkout

### User Experience
- Responsive design for all devices
- Modern UI with smooth animations
- Intuitive navigation
- Loading states and error handling

### Mock Authentication
- Login with: `john.doe@example.com` / `password123`
- Register new accounts
- User profile management

## Development

### Adding New Products
Edit `client/src/data/mockData.ts` to add new products to the mock catalog.

### Customizing Styles
The application uses Tailwind CSS. Modify `client/tailwind.config.js` for custom styling.

### Extending Features
- Add new pages in `client/src/pages/`
- Create reusable components in `client/src/components/`
- Update mock data in `client/src/data/mockData.ts`

## Deployment

### Build for Production
```bash
npm run build
```

The built files will be in `client/build/` directory.

### Deploy to Static Hosting
The application can be deployed to any static hosting service:
- Netlify
- Vercel
- GitHub Pages
- AWS S3

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository. 