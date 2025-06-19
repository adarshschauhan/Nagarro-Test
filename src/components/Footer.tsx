import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Footer: React.FC = () => {
  const { user } = useAuth();
  return (
    <footer className="bg-gray-100 py-6 mt-8 border-t">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} RIMSS. All rights reserved.</div>
        <div className="flex gap-4 mt-2 md:mt-0">
          <Link to="/about" className="hover:text-primary-600">About</Link>
          <Link to="/contact" className="hover:text-primary-600">Contact</Link>
          {user?.role === 'admin' && <Link to="/admin" className="hover:text-primary-600">Admin</Link>}
        </div>
      </div>
    </footer>
  );
};

export default Footer; 