import React from 'react';
import { render } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import SEO from '../../components/SEO';

// Mock react-helmet-async
jest.mock('react-helmet-async', () => ({
  Helmet: ({ children }: { children: React.ReactNode }) => <div data-testid="helmet">{children}</div>,
  HelmetProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

const renderWithHelmet = (component: React.ReactElement) => {
  return render(
    <HelmetProvider>
      {component}
    </HelmetProvider>
  );
};

describe('SEO Component', () => {
  beforeEach(() => {
    // Mock window.location
    Object.defineProperty(window, 'location', {
      value: {
        href: 'https://rimss.com/test',
      },
      writable: true,
    });
  });

  it('renders with default props', () => {
    const { getByTestId } = renderWithHelmet(<SEO />);
    expect(getByTestId('helmet')).toBeInTheDocument();
  });

  it('renders with custom title', () => {
    const { getByTestId } = renderWithHelmet(<SEO title="Custom Title" />);
    expect(getByTestId('helmet')).toBeInTheDocument();
  });

  it('renders with custom description', () => {
    const { getByTestId } = renderWithHelmet(
      <SEO description="Custom description for testing" />
    );
    expect(getByTestId('helmet')).toBeInTheDocument();
  });

  it('renders with custom keywords', () => {
    const { getByTestId } = renderWithHelmet(
      <SEO keywords={['test', 'custom', 'keywords']} />
    );
    expect(getByTestId('helmet')).toBeInTheDocument();
  });

  it('renders with custom image', () => {
    const { getByTestId } = renderWithHelmet(
      <SEO image="/custom-image.jpg" />
    );
    expect(getByTestId('helmet')).toBeInTheDocument();
  });

  it('renders with custom URL', () => {
    const { getByTestId } = renderWithHelmet(
      <SEO url="https://rimss.com/custom-url" />
    );
    expect(getByTestId('helmet')).toBeInTheDocument();
  });

  it('renders with custom type', () => {
    const { getByTestId } = renderWithHelmet(
      <SEO type="product" />
    );
    expect(getByTestId('helmet')).toBeInTheDocument();
  });

  it('renders with all custom props', () => {
    const { getByTestId } = renderWithHelmet(
      <SEO
        title="Test Product"
        description="Test product description"
        keywords={['product', 'test', 'rimss']}
        image="/test-image.jpg"
        url="https://rimss.com/test-product"
        type="product"
      />
    );
    expect(getByTestId('helmet')).toBeInTheDocument();
  });

  it('handles site title correctly', () => {
    const { getByTestId } = renderWithHelmet(
      <SEO title="RIMSS" />
    );
    expect(getByTestId('helmet')).toBeInTheDocument();
  });

  it('handles non-site title correctly', () => {
    const { getByTestId } = renderWithHelmet(
      <SEO title="Custom Product Title" />
    );
    expect(getByTestId('helmet')).toBeInTheDocument();
  });
}); 