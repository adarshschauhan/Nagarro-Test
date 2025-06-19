import React from 'react';
import { render, screen, act, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import { authApi } from '../../services/api';

// Mock the API
jest.mock('../../services/api', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
    getCurrentUser: jest.fn(),
  },
}));

const mockAuthApi = authApi as jest.Mocked<typeof authApi>;

// Test component to access context
const TestComponent = () => {
  const { user, loading, login, register, logout } = useAuth();
  
  return (
    <div>
      <div data-testid="user">{user ? JSON.stringify(user) : 'no-user'}</div>
      <div data-testid="loading">{loading ? 'loading' : 'not-loading'}</div>
      <button onClick={() => login('test@example.com', 'password')}>Login</button>
      <button onClick={() => register({ email: 'test@example.com', password: 'password' })}>Register</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

const renderWithAuthProvider = (component: React.ReactElement) => {
  return render(
    <AuthProvider>
      {component}
    </AuthProvider>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('AuthProvider', () => {
    it('renders children', () => {
      renderWithAuthProvider(<div data-testid="child">Child</div>);
      expect(screen.getByTestId('child')).toBeInTheDocument();
    });

    it('initializes with no user and loading true', () => {
      renderWithAuthProvider(<TestComponent />);
      expect(screen.getByTestId('user')).toHaveTextContent('no-user');
      expect(screen.getByTestId('loading')).toHaveTextContent('loading');
    });

    it('loads user from localStorage on mount', async () => {
      const mockUser = { _id: '1', firstName: 'John', email: 'john@example.com' };
      const mockToken = 'mock-token';
      
      localStorage.setItem('token', mockToken);
      mockAuthApi.getCurrentUser.mockResolvedValue(mockUser);

      renderWithAuthProvider(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('not-loading');
      });

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
      });
    });

    it('handles error when loading user from localStorage', async () => {
      localStorage.setItem('token', 'invalid-token');
      mockAuthApi.getCurrentUser.mockRejectedValue(new Error('Invalid token'));

      renderWithAuthProvider(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('not-loading');
      });

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('no-user');
      });

      expect(localStorage.getItem('token')).toBeNull();
    });

    it('does not load user when no token exists', async () => {
      renderWithAuthProvider(<TestComponent />);

      await waitFor(() => {
        expect(screen.getByTestId('loading')).toHaveTextContent('not-loading');
      });

      expect(mockAuthApi.getCurrentUser).not.toHaveBeenCalled();
    });
  });

  describe('login function', () => {
    it('successfully logs in user', async () => {
      const mockUser = { _id: '1', firstName: 'John', email: 'john@example.com' };
      const mockToken = 'mock-token';
      
      mockAuthApi.login.mockResolvedValue({ user: mockUser, token: mockToken });

      renderWithAuthProvider(<TestComponent />);

      const user = userEvent.setup();
      const loginButton = screen.getByText('Login');
      
      await user.click(loginButton);

      await waitFor(() => {
        expect(mockAuthApi.login).toHaveBeenCalledWith('test@example.com', 'password');
      });

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
      });

      expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken);
    });

    it('handles login error', async () => {
      const error = new Error('Login failed');
      mockAuthApi.login.mockRejectedValue(error);

      renderWithAuthProvider(<TestComponent />);

      const user = userEvent.setup();
      const loginButton = screen.getByText('Login');
      
      await user.click(loginButton);

      await waitFor(() => {
        expect(mockAuthApi.login).toHaveBeenCalledWith('test@example.com', 'password');
      });

      // Should still show no user after error
      expect(screen.getByTestId('user')).toHaveTextContent('no-user');
    });
  });

  describe('register function', () => {
    it('successfully registers user', async () => {
      const mockUser = { _id: '1', firstName: 'John', email: 'john@example.com' };
      const mockToken = 'mock-token';
      
      mockAuthApi.register.mockResolvedValue({ user: mockUser, token: mockToken });

      renderWithAuthProvider(<TestComponent />);

      const user = userEvent.setup();
      const registerButton = screen.getByText('Register');
      
      await user.click(registerButton);

      await waitFor(() => {
        expect(mockAuthApi.register).toHaveBeenCalledWith({ 
          email: 'test@example.com', 
          password: 'password' 
        });
      });

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
      });

      expect(localStorage.setItem).toHaveBeenCalledWith('token', mockToken);
    });

    it('handles registration error', async () => {
      const error = new Error('Registration failed');
      mockAuthApi.register.mockRejectedValue(error);

      renderWithAuthProvider(<TestComponent />);

      const user = userEvent.setup();
      const registerButton = screen.getByText('Register');
      
      await user.click(registerButton);

      await waitFor(() => {
        expect(mockAuthApi.register).toHaveBeenCalledWith({ 
          email: 'test@example.com', 
          password: 'password' 
        });
      });

      // Should still show no user after error
      expect(screen.getByTestId('user')).toHaveTextContent('no-user');
    });
  });

  describe('logout function', () => {
    it('successfully logs out user', async () => {
      // First login a user
      const mockUser = { _id: '1', firstName: 'John', email: 'john@example.com' };
      const mockToken = 'mock-token';
      
      mockAuthApi.login.mockResolvedValue({ user: mockUser, token: mockToken });

      renderWithAuthProvider(<TestComponent />);

      const user = userEvent.setup();
      
      // Login first
      const loginButton = screen.getByText('Login');
      await user.click(loginButton);

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent(JSON.stringify(mockUser));
      });

      // Then logout
      const logoutButton = screen.getByText('Logout');
      await user.click(logoutButton);

      await waitFor(() => {
        expect(screen.getByTestId('user')).toHaveTextContent('no-user');
      });

      expect(localStorage.removeItem).toHaveBeenCalledWith('token');
    });
  });

  describe('useAuth hook', () => {
    it('throws error when used outside AuthProvider', () => {
      // Suppress console.error for this test
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      
      expect(() => {
        render(<TestComponent />);
      }).toThrow('useAuth must be used within an AuthProvider');
      
      consoleSpy.mockRestore();
    });
  });
}); 