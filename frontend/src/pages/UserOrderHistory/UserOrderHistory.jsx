import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loading from '../../components/Loading';
import NotFound from '../../components/NotFound/NotFound';

// Define colors for order statuses
const statusColors = {
  NEW: '#00BFFF', // Light Blue
  IN_PROGRESS: '#FFA500', // Orange
  COMPLETED: '#32CD32', // Green
  CANCELLED: '#FF6347', // Red
};

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch orders for the current user when the component mounts
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders/myOrders', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Replace with actual token handling
                    }
                });
                setOrders(response.data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return<Loading/>;
  

    return (
      <>
        <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-6 text-[#0C7061]">My Orders</h1>
            {orders.length === 0 ? (
                <p className="text-center text-gray-600">No orders found.</p>
            ) : (
                <ul className="list-disc pl-5">
                    {orders.map(order => (
                        <li key={order._id} className="mb-6 p-4 border border-gray-300 rounded-lg shadow-sm">
                            <div className="mb-2">
                                <strong className="font-semibold">Order ID:</strong> {order._id}
                            </div>
                            <div className="mb-2">
                                <strong className="font-semibold">Status:</strong>
                                <span
                                  className="px-3 py-1 rounded"
                                  style={{ backgroundColor: statusColors[order.status], color: 'white' }}
                                >
                                  {order.status}
                                </span>
                            </div>
                            <div className="mb-2">
                                <strong className="font-semibold">Created At:</strong> {new Date(order.createdAt).toLocaleDateString()}
                            </div>
                            <div className="mb-2">
                                <strong className="font-semibold">Total Quantity:</strong> {order.totalQuantity}
                            </div>
                            <div className="mb-2">
                                <strong className="font-semibold">Total Price:</strong> ${order.totalPrice.toFixed(2)}
                            </div>
                            <div>
                                <strong className="font-semibold">Items:</strong>
                                <ul className="list-inside pl-4">
                                    {order.items.map((item, index) => (
                                        <li key={index}>
                                            {item.name} - {item.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
      </>
    );
};

export default OrdersPage;
