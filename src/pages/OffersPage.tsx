import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { offersApi } from '../services/api';
import type { Offer } from '../data/mockData';

const OffersPage: React.FC = () => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOffers = async () => {
      try {
        setLoading(true);
        const offersData = await offersApi.getAll();
        setOffers(offersData);
      } catch (error) {
        console.error('Error loading offers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOffers();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (offers.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold mb-6">Special Offers</h1>
          <p className="text-gray-600 mb-8">No active offers at the moment.</p>
          <Link
            to="/products"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-12">Special Offers</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div
              key={offer._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition duration-300"
            >
              {offer.image && (
                <img
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-48 object-cover"
                />
              )}
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-gray-900">{offer.title}</h3>
                  {offer.discountPercentage > 0 && (
                    <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {offer.discountPercentage}% OFF
                    </span>
                  )}
                </div>
                
                <p className="text-gray-600 mb-4">{offer.description}</p>
                
                <div className="space-y-2 text-sm text-gray-500">
                  {offer.minimumPurchase > 0 && (
                    <p>Minimum purchase: ₹{offer.minimumPurchase}</p>
                  )}
                  {offer.applicableCategories.length > 0 && offer.applicableCategories[0] !== 'All' && (
                    <p>Valid on: {offer.applicableCategories.join(', ')}</p>
                  )}
                  <p>
                    Valid until: {new Date(offer.validTo).toLocaleDateString()}
                  </p>
                </div>
                
                <Link
                  to={`/products${offer.applicableCategories[0] !== 'All' ? `?category=${offer.applicableCategories[0]}` : ''}`}
                  className="mt-6 block text-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                >
                  Shop Now
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OffersPage; 