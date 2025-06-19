import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/Header';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartProvider } from '../../contexts/CartContext';

// Mock the contexts
const mockAuthContext = {
  user: null,
  loading: false,
  login: jest.fn(),
  register: jest.fn(),
  logout: jest.fn(),
};

const mockCartContext = {
  items: [],
  addItem: jest.fn(),
  removeItem: jest.fn(),
  updateQuantity: jest.fn(),
  clearCart: jest.fn(),
  getTotalPrice: jest.fn(() => 0),
  getTotalItems: jest.fn(() => 0),
};

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: () => mockAuthContext,
  AuthProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('../../contexts/CartContext', () => ({
  useCart: () => mockCartContext,
  CartProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderWithProviders = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {component}
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders header with logo', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('RIMSS')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Offers')).toBeInTheDocument();
  });

  it('renders cart icon', () => {
    renderWithProviders(<Header />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows login and register buttons when user is not authenticated', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  it('shows user information and logout button when user is authenticated', () => {
    mockAuthContext.user = {
      _id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    };

    renderWithProviders(<Header />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  it('calls logout function when logout button is clicked', () => {
    mockAuthContext.user = {
      _id: '1',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    };

    renderWithProviders(<Header />);
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    expect(mockAuthContext.logout).toHaveBeenCalledTimes(1);
  });

  it('shows cart item count when cart has items', () => {
    mockCartContext.getTotalItems = jest.fn(() => 3);
    renderWithProviders(<Header />);
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('does not show cart item count when cart is empty', () => {
    mockCartContext.getTotalItems = jest.fn(() => 0);
    renderWithProviders(<Header />);
    expect(screen.queryByText('0')).not.toBeInTheDocument();
  });

  it('renders with correct styling classes', () => {
    renderWithProviders(<Header />);
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-white', 'shadow-sm', 'sticky', 'top-0', 'z-30');
  });

  it('handles user with only first name', () => {
    mockAuthContext.user = {
      _id: '1',
      firstName: 'John',
      lastName: '',
      email: 'john@example.com',
    };

    renderWithProviders(<Header />);
    expect(screen.getByText('John')).toBeInTheDocument();
  });

  it('handles user with only last name', () => {
    mockAuthContext.user = {
      _id: '1',
      firstName: '',
      lastName: 'Doe',
      email: 'john@example.com',
    };

    renderWithProviders(<Header />);
    expect(screen.getByText('Doe')).toBeInTheDocument();
  });
}); 