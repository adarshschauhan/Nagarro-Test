import { mockApi } from '../data/mockData';
import type { Product, User, CartItem, Order, Offer } from '../data/mockData';

// Products API
export const productsApi = {
  getAll: async (filters?: any): Promise<Product[]> => {
    return mockApi.getProducts(filters);
  },
  
  getById: async (id: string): Promise<Product | null> => {
    return mockApi.getProduct(id);
  },
  
  getFeatured: async (): Promise<Product[]> => {
    return mockApi.getFeaturedProducts();
  },
  
  getCategories: async (): Promise<string[]> => {
    return mockApi.getCategories();
  }
};

// Cart API
export const cartApi = {
  get: async (): Promise<CartItem[]> => {
    return mockApi.getCart();
  },
  
  addItem: async (productId: string, quantity: number, color?: string, size?: string): Promise<CartItem[]> => {
    return mockApi.addToCart(productId, quantity, color, size);
  },
  
  updateItem: async (itemId: string, quantity: number): Promise<CartItem[]> => {
    return mockApi.updateCartItem(itemId, quantity);
  },
  
  removeItem: async (itemId: string): Promise<CartItem[]> => {
    return mockApi.removeFromCart(itemId);
  },
  
  clear: async (): Promise<void> => {
    return mockApi.clearCart();
  }
};

// Orders API
export const ordersApi = {
  getAll: async (): Promise<Order[]> => {
    return mockApi.getOrders();
  },
  
  create: async (orderData: any): Promise<Order> => {
    return mockApi.createOrder(orderData);
  }
};

// Offers API
export const offersApi = {
  getAll: async (): Promise<Offer[]> => {
    return mockApi.getOffers();
  }
};

// Auth API
export const authApi = {
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    return mockApi.login(email, password);
  },
  
  register: async (userData: any): Promise<{ user: User; token: string }> => {
    return mockApi.register(userData);
  },
  
  getCurrentUser: async (): Promise<User> => {
    return mockApi.getCurrentUser();
  }
};

// Payment API (Mock Stripe)
export const paymentApi = {
  createPaymentIntent: async (amount: number): Promise<{ clientSecret: string }> => {
    // Simulate Stripe payment intent creation
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      clientSecret: 'mock_client_secret_' + Date.now()
    };
  },
  
  confirmPayment: async (paymentIntentId: string): Promise<{ success: boolean }> => {
    // Simulate payment confirmation
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { success: true };
  }
}; 