import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import App from '../App';
import { render } from '../utils/test-utils';
import { useAuth } from '../contexts/AuthContext';

jest.mock('../contexts/AuthContext');

const mockedUseAuth = useAuth as jest.Mock;

const mockProductsApi = {
    getAll: jest.fn(),
    getById: jest.fn(),
    getFeatured: jest.fn(),
    getCategories: jest.fn(),
};

const mockOffersApi = {
    getAll: jest.fn(),
};

jest.mock('../services/api', () => ({
    productsApi: mockProductsApi,
    offersApi: mockOffersApi,
    authApi: {
        login: jest.fn(),
        register: jest.fn(),
        getCurrentUser: jest.fn(),
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
    paymentApi: {
        createPaymentIntent: jest.fn(),
        confirmPayment: jest.fn(),
    },
}));

describe('App routing', () => {
    beforeEach(() => {
        mockedUseAuth.mockReturnValue({
            user: null,
            loading: false,
        });

        mockProductsApi.getFeatured.mockResolvedValue([]);
        mockProductsApi.getAll.mockResolvedValue([]);
        mockOffersApi.getAll.mockResolvedValue([]);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders home page on default route', async () => {
        render(<App />, { route: '/' });
        await waitFor(() => {
            expect(screen.getByText(/Featured Products/i)).toBeInTheDocument();
        });
    });

    test('renders login page on /login route', async () => {
        render(<App />, { route: '/login' });
        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /Login/i })).toBeInTheDocument();
        });
    });

    test('renders products page on /products route', async () => {
        render(<App />, { route: '/products' });
        await waitFor(() => {
            expect(screen.getByText(/All Products/i)).toBeInTheDocument();
        });
    });

    test('renders offers page on /offers route', async () => {
        render(<App />, { route: '/offers' });
        await waitFor(() => {
            expect(screen.getByText(/Latest Offers/i)).toBeInTheDocument();
        });
    });

    test('renders profile page on /profile route when authenticated', async () => {
        mockedUseAuth.mockReturnValue({
            user: { firstName: 'Test' },
            loading: false,
        });
        render(<App />, { route: '/profile' });
        await waitFor(() => {
            expect(screen.getByRole('heading', { name: /My Profile/i })).toBeInTheDocument();
        });
    });

    test('redirects from /profile to home when not authenticated', async () => {
        render(<App />, { route: '/profile' });
        await waitFor(() => {
            expect(screen.getByText(/Featured Products/i)).toBeInTheDocument();
        });
    });
}); 