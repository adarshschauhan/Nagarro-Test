import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../contexts/AuthContext';
import * as api from '../../services/api';

// Mock the entire api module
jest.mock('../../services/api', () => ({
  authApi: {
    login: jest.fn(),
    register: jest.fn(),
    getCurrentUser: jest.fn(),
  },
  productsApi: {
    getAll: jest.fn(),
    getById: jest.fn(),
    getFeatured: jest.fn(),
    getCategories: jest.fn(),
  },
  cartApi: {
    get: jest.fn(),
    addItem: jest.fn(),
    updateItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  ordersApi: {
    getAll: jest.fn(),
    create: jest.fn(),
  },
  offersApi: {
    getAll: jest.fn(),
  },
  paymentApi: {
    createPaymentIntent: jest.fn(),
    confirmPayment: jest.fn(),
  },
}));


const mockedApi = api as jest.Mocked<typeof api>;

const mockUser = {
  _id: '123',
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  role: 'user' as const,
};

const mockToken = 'mock-token';

describe('AuthContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('provides user and loading state', async () => {
    mockedApi.authApi.getCurrentUser.mockResolvedValueOnce(null);
    const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
    expect(result.current.user).toBeNull();
    await waitFor(() => expect(result.current.loading).toBe(false));
  });

  describe('login function', () => {
    it('successfully logs in and fetches user', async () => {
      mockedApi.authApi.login.mockResolvedValue({ user: mockUser, token: mockToken });
      
      const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

      await act(async () => {
        await result.current.login('test@example.com', 'password');
      });

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
      });
      expect(localStorage.getItem('token')).toBe(mockToken);
    });

    it('handles login error', async () => {
      const error = new Error('Login failed');
      mockedApi.authApi.login.mockRejectedValue(error);

      const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

      await expect(result.current.login('test@example.com', 'password')).rejects.toThrow('Login failed');
    });
  });

  describe('register function', () => {
    it('successfully registers user', async () => {
      mockedApi.authApi.register.mockResolvedValue({ user: mockUser, token: mockToken });

      const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

      await act(async () => {
        await result.current.register({
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: 'password',
        });
      });

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
      });
      expect(localStorage.getItem('token')).toBe(mockToken);
    });

    it('handles registration error', async () => {
      const error = new Error('Registration failed');
      mockedApi.authApi.register.mockRejectedValue(error);

      const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

      await expect(
        result.current.register({
          firstName: 'Test',
          lastName: 'User',
          email: 'test@example.com',
          password: 'password',
        })
      ).rejects.toThrow('Registration failed');
    });
  });

  describe('logout function', () => {
    it('successfully logs out user', async () => {
      // First, log in the user
      localStorage.setItem('token', mockToken);
      mockedApi.authApi.getCurrentUser.mockResolvedValue(mockUser);
      
      const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });
      
      await waitFor(() => expect(result.current.user).toEqual(mockUser));

      // Then, log out
      await act(async () => {
        result.current.logout();
      });

      expect(result.current.user).toBeNull();
      expect(localStorage.getItem('token')).toBeNull();
    });
  });

  describe('initial load', () => {
    it('verifies token on initial load and sets user', async () => {
      localStorage.setItem('token', mockToken);
      mockedApi.authApi.getCurrentUser.mockResolvedValue(mockUser);

      const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
        expect(result.current.loading).toBe(false);
      });
      expect(mockedApi.authApi.getCurrentUser).toHaveBeenCalled();
    });

    it('handles verification error on initial load', async () => {
      localStorage.setItem('token', mockToken);
      mockedApi.authApi.getCurrentUser.mockRejectedValue(new Error('Verification failed'));

      const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

      await waitFor(() => {
        expect(result.current.user).toBeNull();
        expect(result.current.loading).toBe(false);
      });
      expect(mockedApi.authApi.getCurrentUser).toHaveBeenCalled();
    });
  });
});
