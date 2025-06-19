import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './index.css';
import App from './App';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import reportWebVitals from './reportWebVitals';

// Performance monitoring function
const reportWebVitalsCallback = (metric: any) => {
  // Send metrics to analytics
  if (process.env.NODE_ENV === 'production') {
    // You can send these metrics to your analytics service
    console.log(metric);
  }
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AuthProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </AuthProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// Monitor web vitals
reportWebVitals(reportWebVitalsCallback); 