import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { CartProvider, useCart } from '../../contexts/CartContext';
import { cartApi } from '../../services/api';
import { mockProducts } from '../../data/mockData';

// Mock the entire api module
jest.mock('../../services/api');

const mockedCartApi = cartApi as jest.Mocked<typeof cartApi>;

const mockCartItem = {
  _id: 'ci1',
  product: mockProducts[0],
  quantity: 1,
  color: 'Red',
  size: 'M'
};

const mockCartItem2 = {
    _id: 'ci2',
    product: mockProducts[1],
    quantity: 2,
    color: 'Blue',
    size: 'L'
  };

describe('CartContext', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('loads cart items on initial render', async () => {
    mockedCartApi.get.mockResolvedValue([mockCartItem]);
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.items).toEqual([mockCartItem]);
    });
    expect(mockedCartApi.get).toHaveBeenCalledTimes(1);
  });

  it('adds an item to the cart', async () => {
    mockedCartApi.get.mockResolvedValue([]);
    mockedCartApi.addItem.mockResolvedValue([mockCartItem]);
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    await act(async () => {
      await result.current.addToCart(mockProducts[0], 1, 'Red', 'M');
    });
    
    expect(result.current.items).toEqual([mockCartItem]);
    expect(mockedCartApi.addItem).toHaveBeenCalledWith(mockProducts[0]._id, 1, 'Red', 'M');
  });

  it('updates item quantity', async () => {
    mockedCartApi.get.mockResolvedValue([mockCartItem]);
    mockedCartApi.updateItem.mockResolvedValue([{...mockCartItem, quantity: 2}]);

    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.updateQuantity(mockCartItem._id, 2);
    });

    expect(result.current.items[0].quantity).toBe(2);
    expect(mockedCartApi.updateItem).toHaveBeenCalledWith(mockCartItem._id, 2);
  });

  it('removes an item from the cart', async () => {
    mockedCartApi.get.mockResolvedValue([mockCartItem]);
    mockedCartApi.removeItem.mockResolvedValue([]);

    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });

    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.removeFromCart(mockCartItem._id);
    });

    expect(result.current.items).toEqual([]);
    expect(mockedCartApi.removeItem).toHaveBeenCalledWith(mockCartItem._id);
  });

  it('clears the cart', async () => {
    mockedCartApi.get.mockResolvedValue([mockCartItem, mockCartItem2]);
    mockedCartApi.clear.mockResolvedValue();

    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    
    await waitFor(() => expect(result.current.loading).toBe(false));

    await act(async () => {
      await result.current.clearCart();
    });

    expect(result.current.items).toEqual([]);
    expect(mockedCartApi.clear).toHaveBeenCalledTimes(1);
  });

  it('calculates total items', async () => {
    mockedCartApi.get.mockResolvedValue([mockCartItem, mockCartItem2]);
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.getTotalItems()).toBe(3);
  });

  it('calculates total price', async () => {
    mockedCartApi.get.mockResolvedValue([mockCartItem, mockCartItem2]);
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    
    await waitFor(() => expect(result.current.loading).toBe(false));

    const expectedPrice = (mockCartItem.product.price * mockCartItem.quantity) + (mockCartItem2.product.price * mockCartItem2.quantity);
    expect(result.current.getTotalPrice()).toBe(expectedPrice);
  });

  it('calculates total price with discounted items', async () => {
    const discountedItem = {
        _id: 'ci3',
        product: { ...mockProducts[2], isDiscounted: true, price: 120 },
        quantity: 1,
    }
    mockedCartApi.get.mockResolvedValue([discountedItem]);
    const { result } = renderHook(() => useCart(), { wrapper: CartProvider });
    
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.getTotalPrice()).toBe(120);
  });

}); 