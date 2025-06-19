import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const itemCount = getTotalItems();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        <Link to="/" className="text-2xl font-bold text-primary-700">RIMSS</Link>
        <nav className="flex items-center gap-6">
          <Link to="/" className="hover:text-primary-600 font-medium">Home</Link>
          <Link to="/products" className="hover:text-primary-600 font-medium">Products</Link>
          <Link to="/offers" className="hover:text-primary-600 font-medium">Offers</Link>
        </nav>
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/cart')} className="relative">
            <ShoppingCartIcon className="h-7 w-7 text-primary-700" />
            {itemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent-600 text-white text-xs rounded-full px-1.5 py-0.5">
                {itemCount}
              </span>
            )}
          </button>
          {user ? (
            <div className="flex items-center gap-2">
              <UserCircleIcon className="h-7 w-7 text-secondary-700" />
              <span className="font-medium">{user.firstName}</span>
              <button onClick={logout} className="btn-secondary ml-2">Logout</button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-primary">Login</Link>
              <Link to="/register" className="btn-secondary">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 