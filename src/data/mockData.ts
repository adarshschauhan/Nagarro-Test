export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  rating: number;
  reviews: number;
  isDiscounted: boolean;
  discountPercentage?: number;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt?: string;
  emailVerified?: boolean;
  isActive?: boolean;
}

export interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  _id: string;
  user: User;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface Offer {
  _id: string;
  title: string;
  description: string;
  discountPercentage: number;
  validFrom: string;
  validTo: string;
  isActive: boolean;
  applicableCategories: string[];
  minimumPurchase: number;
  image: string;
}

// Mock Products Data
export const mockProducts: Product[] = [
  {
    _id: '1',
    name: 'Classic Merino Wool Sweater',
    description: 'Luxuriously soft merino wool sweater with traditional cable knit pattern. Perfect blend of countryside charm and modern sophistication.',
    price: 299.99,
    originalPrice: 399.99,
    category: 'Clothing',
    brand: 'RIMSS Heritage',
    images: [
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=500',
      'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=500'
    ],
    colors: ['Navy', 'Forest Green', 'Burgundy', 'Camel'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 50,
    rating: 4.8,
    reviews: 247,
    isDiscounted: true,
    discountPercentage: 25,
    isFeatured: true,
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z'
  },
  {
    _id: '2',
    name: 'Premium Moleskin Trousers',
    description: 'Classic moleskin trousers crafted from the finest cotton. Features a contemporary slim fit while maintaining traditional countryside durability.',
    price: 189.99,
    category: 'Clothing',
    brand: 'RIMSS Country',
    images: [
      'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=500',
      'https://images.unsplash.com/photo-1614251056216-f748f76cd228?w=500'
    ],
    colors: ['Olive', 'Khaki', 'Brown', 'Navy'],
    sizes: ['28/30', '30/30', '32/30', '34/30', '36/30', '38/30'],
    stock: 75,
    rating: 4.7,
    reviews: 182,
    isDiscounted: false,
    isFeatured: true,
    createdAt: '2024-01-10T10:00:00Z',
    updatedAt: '2024-01-10T10:00:00Z'
  },
  {
    _id: '3',
    name: 'Signature Tattersall Shirt',
    description: 'Iconic tattersall check shirt made from premium cotton. A perfect blend of traditional countryside style with modern tailoring.',
    price: 149.99,
    originalPrice: 189.99,
    category: 'Clothing',
    brand: 'RIMSS Classic',
    images: [
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500',
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=500'
    ],
    colors: ['Red/Navy Check', 'Green/Brown Check', 'Blue/White Check'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    stock: 100,
    rating: 4.9,
    reviews: 367,
    isDiscounted: true,
    discountPercentage: 20,
    isFeatured: true,
    createdAt: '2024-01-05T10:00:00Z',
    updatedAt: '2024-01-05T10:00:00Z'
  },
  {
    _id: '4',
    name: 'Fine Corduroy Blazer',
    description: 'Sophisticated corduroy blazer with modern cut. Features traditional elbow patches and premium horn buttons.',
    price: 449.99,
    category: 'Clothing',
    brand: 'RIMSS Luxury',
    images: [
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=500',
      'https://images.unsplash.com/photo-1598626742931-0c6164b45ae7?w=500'
    ],
    colors: ['Russet Brown', 'Forest Green', 'Navy'],
    sizes: ['36R', '38R', '40R', '42R', '44R', '46R'],
    stock: 40,
    rating: 4.8,
    reviews: 134,
    isDiscounted: false,
    isFeatured: true,
    createdAt: '2024-01-12T10:00:00Z',
    updatedAt: '2024-01-12T10:00:00Z'
  },
  {
    _id: '5',
    name: 'Modern Cashmere Blend Sweater',
    description: 'Contemporary slim-fit sweater made from luxurious cashmere blend. Perfect for both city and country wear.',
    price: 279.99,
    originalPrice: 349.99,
    category: 'Clothing',
    brand: 'RIMSS Modern',
    images: [
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=500',
      'https://images.unsplash.com/photo-1586337276000-c04c930c5f07?w=500'
    ],
    colors: ['Charcoal', 'Cream', 'Light Grey', 'Black'],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    stock: 60,
    rating: 4.7,
    reviews: 218,
    isDiscounted: true,
    discountPercentage: 20,
    isFeatured: true,
    createdAt: '2024-01-08T10:00:00Z',
    updatedAt: '2024-01-08T10:00:00Z'
  },
  {
    _id: '6',
    name: 'Heritage Leather Field Boots',
    description: 'Handcrafted leather field boots made from premium full-grain leather. Waterproof and perfect for both country walks and city streets.',
    price: 389.99,
    category: 'Footwear',
    brand: 'RIMSS Heritage',
    images: [
      'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=500',
      'https://images.unsplash.com/photo-1608256244841-d1c2eacd7a1f?w=500'
    ],
    colors: ['Cognac', 'Dark Brown', 'Black'],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11', 'UK 12'],
    stock: 45,
    rating: 4.9,
    reviews: 156,
    isDiscounted: false,
    isFeatured: true,
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  },
  {
    _id: '7',
    name: 'Children\'s Quilted Jacket',
    description: 'Classic quilted jacket designed for children, featuring the same quality and style as our adult range. Perfect for outdoor activities.',
    price: 129.99,
    originalPrice: 159.99,
    category: 'Children',
    brand: 'RIMSS Junior',
    images: [
      'https://images.unsplash.com/photo-1606791422814-b32c705fa100?w=500',
      'https://images.unsplash.com/photo-1606791422412-d3e1755fd71b?w=500'
    ],
    colors: ['Navy', 'Olive', 'Red'],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    stock: 80,
    rating: 4.8,
    reviews: 92,
    isDiscounted: true,
    discountPercentage: 18,
    isFeatured: false,
    createdAt: '2024-01-18T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  },
  {
    _id: '8',
    name: 'Leather and Canvas Weekend Bag',
    description: 'Luxurious weekend bag combining traditional canvas with premium leather trim. Perfect for country getaways or city breaks.',
    price: 299.99,
    category: 'Accessories',
    brand: 'RIMSS Accessories',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=500',
      'https://images.unsplash.com/photo-1590874103246-bc0b5b675137?w=500'
    ],
    colors: ['Tan/Olive', 'Brown/Khaki', 'Black/Grey'],
    sizes: ['One Size'],
    stock: 35,
    rating: 4.7,
    reviews: 78,
    isDiscounted: false,
    isFeatured: true,
    createdAt: '2024-01-14T10:00:00Z',
    updatedAt: '2024-01-14T10:00:00Z'
  }
];

// Mock User Data
export const mockUser: User = {
  _id: 'user1',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
  role: 'user',
  phone: '+1 (555) 123-4567',
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zipCode: '12345',
    country: 'United States'
  },
  createdAt: '2024-01-01T00:00:00Z',
  emailVerified: true,
  isActive: true
};

// Mock Cart Data
export const mockCart: CartItem[] = [
  {
    _id: 'cart1',
    product: mockProducts[0],
    quantity: 1,
    selectedColor: 'Black',
    selectedSize: 'One Size'
  },
  {
    _id: 'cart2',
    product: mockProducts[2],
    quantity: 2,
    selectedColor: 'Navy',
    selectedSize: 'M'
  }
];

// Mock Orders Data
export const mockOrders: Order[] = [
  {
    _id: 'order1',
    user: mockUser,
    items: [
      {
        _id: 'orderItem1',
        product: mockProducts[1],
        quantity: 1,
        selectedColor: 'Black',
        selectedSize: 'Medium'
      }
    ],
    totalAmount: 299.99,
    status: 'delivered',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'Credit Card',
    paymentStatus: 'completed',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-18T10:00:00Z'
  },
  {
    _id: 'order2',
    user: mockUser,
    items: [
      {
        _id: 'orderItem2',
        product: mockProducts[4],
        quantity: 1,
        selectedColor: 'Black',
        selectedSize: 'One Size'
      },
      {
        _id: 'orderItem3',
        product: mockProducts[6],
        quantity: 1,
        selectedColor: 'White',
        selectedSize: 'One Size'
      }
    ],
    totalAmount: 139.98,
    status: 'processing',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'PayPal',
    paymentStatus: 'completed',
    createdAt: '2024-01-20T10:00:00Z',
    updatedAt: '2024-01-20T10:00:00Z'
  }
];

// Mock Offers Data
export const mockOffers: Offer[] = [
  {
    _id: 'offer1',
    title: 'Electronics Sale',
    description: 'Get up to 40% off on all electronics',
    discountPercentage: 40,
    validFrom: '2024-01-01T00:00:00Z',
    validTo: '2024-01-31T23:59:59Z',
    isActive: true,
    applicableCategories: ['Electronics'],
    minimumPurchase: 50,
    image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500'
  },
  {
    _id: 'offer2',
    title: 'Free Shipping',
    description: 'Free shipping on orders over $100',
    discountPercentage: 0,
    validFrom: '2024-01-01T00:00:00Z',
    validTo: '2024-12-31T23:59:59Z',
    isActive: true,
    applicableCategories: ['All'],
    minimumPurchase: 100,
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=500'
  },
  {
    _id: 'offer3',
    title: 'New Customer Discount',
    description: '20% off your first purchase',
    discountPercentage: 20,
    validFrom: '2024-01-01T00:00:00Z',
    validTo: '2024-12-31T23:59:59Z',
    isActive: true,
    applicableCategories: ['All'],
    minimumPurchase: 25,
    image: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?w=500'
  }
];

// Mock API functions
export const mockApi = {
  // Products
  getProducts: async (filters?: any): Promise<Product[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filteredProducts = [...mockProducts];
    
    if (filters) {
      if (filters.category && filters.category !== 'All') {
        filteredProducts = filteredProducts.filter(p => p.category === filters.category);
      }
      
      if (filters.isDiscounted) {
        filteredProducts = filteredProducts.filter(p => p.isDiscounted);
      }
      
      if (filters.minPrice) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice);
      }
      
      if (filters.maxPrice) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice);
      }
      
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        filteredProducts = filteredProducts.filter(p => 
          p.name.toLowerCase().includes(searchTerm) ||
          p.description.toLowerCase().includes(searchTerm) ||
          p.brand.toLowerCase().includes(searchTerm)
        );
      }
      
      if (filters.color) {
        filteredProducts = filteredProducts.filter(p => 
          p.colors.some(c => c.toLowerCase().includes(filters.color.toLowerCase()))
        );
      }
    }
    
    return filteredProducts;
  },
  
  getProduct: async (id: string): Promise<Product | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProducts.find(p => p._id === id) || null;
  },
  
  getFeaturedProducts: async (): Promise<Product[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockProducts.filter(p => p.isFeatured);
  },
  
  // Categories
  getCategories: async (): Promise<string[]> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const categories = [...new Set(mockProducts.map(p => p.category))];
    return ['All', ...categories];
  },
  
  // Cart
  getCart: async (): Promise<CartItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockCart];
  },
  
  addToCart: async (productId: string, quantity: number, color?: string, size?: string): Promise<CartItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const product = mockProducts.find(p => p._id === productId);
    if (!product) throw new Error('Product not found');
    
    const existingItemIndex = mockCart.findIndex(item => 
      item.product._id === productId && 
      item.selectedColor === color && 
      item.selectedSize === size
    );
    
    const newCart = [...mockCart];
    
    if (existingItemIndex > -1) {
      newCart[existingItemIndex] = {
        ...newCart[existingItemIndex],
        quantity: newCart[existingItemIndex].quantity + quantity
      };
    } else {
      newCart.push({
        _id: `cart${Date.now()}`,
        product,
        quantity,
        selectedColor: color,
        selectedSize: size
      });
    }
    
    mockCart.length = 0;
    mockCart.push(...newCart);
    return [...newCart];
  },
  
  updateCartItem: async (itemId: string, quantity: number): Promise<CartItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const itemIndex = mockCart.findIndex(item => item._id === itemId);
    
    if (itemIndex > -1) {
      const newCart = [...mockCart];
      
      if (quantity <= 0) {
        newCart.splice(itemIndex, 1);
      } else {
        newCart[itemIndex] = {
          ...newCart[itemIndex],
          quantity: quantity
        };
      }
      
      mockCart.length = 0;
      mockCart.push(...newCart);
      return [...newCart];
    }
    
    return [...mockCart];
  },
  
  removeFromCart: async (itemId: string): Promise<CartItem[]> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const itemIndex = mockCart.findIndex(item => item._id === itemId);
    
    if (itemIndex > -1) {
      const newCart = [...mockCart];
      newCart.splice(itemIndex, 1);
      
      mockCart.length = 0;
      mockCart.push(...newCart);
      return [...newCart];
    }
    
    return [...mockCart];
  },
  
  clearCart: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 200));
    mockCart.length = 0;
  },
  
  // Orders
  getOrders: async (): Promise<Order[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockOrders;
  },
  
  createOrder: async (orderData: any): Promise<Order> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newOrder: Order = {
      _id: `order${Date.now()}`,
      user: mockUser,
      items: mockCart,
      totalAmount: orderData.totalAmount,
      status: 'pending',
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    mockOrders.push(newOrder);
    mockCart.length = 0; // Clear cart after order
    
    return newOrder;
  },
  
  // Offers
  getOffers: async (): Promise<Offer[]> => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return mockOffers.filter(offer => offer.isActive);
  },
  
  // Auth
  login: async (email: string, password: string): Promise<{ user: User; token: string }> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    if (email === 'john.doe@example.com' && password === 'password123') {
      return {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now()
      };
    }
    throw new Error('Invalid credentials');
  },
  
  register: async (userData: any): Promise<{ user: User; token: string }> => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const newUser: User = {
      _id: `user${Date.now()}`,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      avatar: userData.avatar,
      role: 'user'
    };
    
    return {
      user: newUser,
      token: 'mock-jwt-token-' + Date.now()
    };
  },
  
  getCurrentUser: async (): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUser;
  }
};

// Indian States and Union Territories
export const indianStates = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
  'Andaman and Nicobar Islands',
  'Chandigarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Jammu and Kashmir',
  'Ladakh',
  'Lakshadweep',
  'Puducherry'
]; 