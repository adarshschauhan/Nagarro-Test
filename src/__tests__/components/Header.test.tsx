import React from 'react';
import { screen, render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from '../../components/Header';
import { AuthProvider } from '../../contexts/AuthContext';
import { CartProvider } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import userEvent from '@testing-library/user-event';

jest.mock('../../contexts/AuthContext', () => ({
    ...jest.requireActual('../../contexts/AuthContext'),
    useAuth: jest.fn(),
}));

jest.mock('../../contexts/CartContext', () => ({
    ...jest.requireActual('../../contexts/CartContext'),
    useCart: jest.fn(),
}));

const mockedUseAuth = useAuth as jest.Mock;
const mockedUseCart = useCart as jest.Mock;

const renderWithProviders = (ui: React.ReactElement) => {
    return render(
        <BrowserRouter>
            <AuthProvider>
                <CartProvider>{ui}</CartProvider>
            </AuthProvider>
        </BrowserRouter>
    );
};

describe('Header component', () => {
  beforeEach(() => {
    mockedUseAuth.mockReturnValue({
      user: null,
      logout: jest.fn(),
      loading: false,
    });
    mockedUseCart.mockReturnValue({
      getTotalItems: () => 0,
      loading: false,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders logo and navigation links', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('RIMSS')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Offers')).toBeInTheDocument();
  });

  test('shows login and register buttons when logged out', () => {
    renderWithProviders(<Header />);
    expect(screen.getByText('Login')).toBeInTheDocument();
    expect(screen.getByText('Register')).toBeInTheDocument();
  });

  test('shows user name and logout button when logged in', () => {
    mockedUseAuth.mockReturnValue({
      user: { firstName: 'Test' },
      logout: jest.fn(),
    });
    renderWithProviders(<Header />);
    expect(screen.getByText('Test')).toBeInTheDocument();
    expect(screen.getByText('Logout')).toBeInTheDocument();
  });

  test('displays the correct number of items in the cart', () => {
    mockedUseCart.mockReturnValue({
      getTotalItems: () => 5,
    });
    renderWithProviders(<Header />);
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  test('navigates to cart page on cart button click', async () => {
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    const cartButton = screen.getByRole('button', { name: /cart/i });
    await user.click(cartButton);
  });

  test('calls logout when logout button is clicked', async () => {
    const logoutMock = jest.fn();
    mockedUseAuth.mockReturnValue({
      user: { firstName: 'Test' },
      logout: logoutMock,
    });
    const user = userEvent.setup();
    renderWithProviders(<Header />);
    const logoutButton = screen.getByText('Logout');
    await user.click(logoutButton);
    expect(logoutMock).toHaveBeenCalledTimes(1);
  });
}); 