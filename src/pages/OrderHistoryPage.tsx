import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

interface Order {
  _id: string;
  items: Array<{
    product: {
      _id: string;
      name: string;
      thumbnail: string;
    };
    quantity: number;
    price: number;
  }>;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
  trackingNumber?: string;
  estimatedDelivery?: string;
}

const OrderHistoryPage: React.FC = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Please log in to view your orders.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div>Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Order History</h1>
      
      {orders.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">You haven't placed any orders yet.</p>
          <Link to="/products" className="btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-sm border">
              <div className="p-6 border-b">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Order #{order._id.slice(-8)}</h3>
                    <p className="text-gray-600">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-col sm:items-end mt-2 sm:mt-0">
                    <span className="text-lg font-semibold">₹{order.total.toFixed(2)}</span>
                    <div className="flex gap-2 mt-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h4 className="font-semibold mb-4">Items</h4>
                <div className="space-y-3">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <img 
                        src={item.product.thumbnail} 
                        alt={item.product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div className="flex-1 ml-3">
                        <h5 className="font-medium">{item.product.name}</h5>
                        <p className="text-sm text-gray-600">
                          Qty: {item.quantity} × ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                      <span className="font-medium">
                        ₹{(item.quantity * item.price).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-semibold mb-2">Order Details</h5>
                      <div className="space-y-1 text-sm">
                        <p><span className="text-gray-600">Order ID:</span> {order._id}</p>
                        <p><span className="text-gray-600">Date:</span> {new Date(order.createdAt).toLocaleString()}</p>
                        {order.trackingNumber && (
                          <p><span className="text-gray-600">Tracking:</span> {order.trackingNumber}</p>
                        )}
                        {order.estimatedDelivery && (
                          <p><span className="text-gray-600">Estimated Delivery:</span> {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-semibold mb-2">Actions</h5>
                      <div className="space-y-2">
                        <button className="w-full btn-secondary text-sm">
                          View Details
                        </button>
                        {order.status === 'delivered' && (
                          <button className="w-full btn-secondary text-sm">
                            Download Invoice
                          </button>
                        )}
                        {order.trackingNumber && (
                          <button className="w-full btn-secondary text-sm">
                            Track Package
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage; 