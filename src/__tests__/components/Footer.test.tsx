import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer Component', () => {
  it('renders footer with company name', () => {
    render(<Footer />);
    expect(screen.getByText(/RIMSS/i)).toBeInTheDocument();
  });

  it('renders copyright information', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(currentYear.toString()))).toBeInTheDocument();
  });

  it('renders footer links', () => {
    render(<Footer />);
    expect(screen.getByText('About Us')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
    expect(screen.getByText('Privacy Policy')).toBeInTheDocument();
    expect(screen.getByText('Terms of Service')).toBeInTheDocument();
  });

  it('renders social media links', () => {
    render(<Footer />);
    expect(screen.getByText('Facebook')).toBeInTheDocument();
    expect(screen.getByText('Twitter')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
  });

  it('renders with correct styling classes', () => {
    render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-gray-800', 'text-white');
  });

  it('renders footer sections', () => {
    render(<Footer />);
    expect(screen.getByText('Quick Links')).toBeInTheDocument();
    expect(screen.getByText('Follow Us')).toBeInTheDocument();
  });

  it('renders contact information', () => {
    render(<Footer />);
    expect(screen.getByText(/support@rimss\.com/i)).toBeInTheDocument();
    expect(screen.getByText(/\+91-\d{10}/)).toBeInTheDocument();
  });

  it('renders address information', () => {
    render(<Footer />);
    expect(screen.getByText(/Mumbai, Maharashtra/i)).toBeInTheDocument();
  });
});
