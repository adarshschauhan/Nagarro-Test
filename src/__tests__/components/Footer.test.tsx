import React from 'react';
import { screen } from '@testing-library/react';
import Footer from '../../components/Footer';
import { render } from '../../utils/test-utils';

describe('Footer Component', () => {
  it('renders correctly', () => {
    render(<Footer />);
    expect(screen.getByText(/© 2025 RIMSS/i)).toBeInTheDocument();
  });
}); 