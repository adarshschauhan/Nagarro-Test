import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from '../contexts/CartContext';
import { HelmetProvider } from 'react-helmet-async';

function render(
  ui: React.ReactElement,
  {
    route = '/',
    ...renderOptions
  }: { route?: string;[key: string]: any } = {}
) {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <HelmetProvider>
      <MemoryRouter initialEntries={[route]}>
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </MemoryRouter>
    </HelmetProvider>
  );

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

export * from '@testing-library/react';
export { render }; 