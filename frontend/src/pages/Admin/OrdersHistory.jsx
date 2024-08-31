import React, { useEffect, useState } from 'react';
import { getAllorders } from '../../services/OrderServices';
import Loading from '../../components/Loading';

// Define colors for order statuses
const statusColors = {
  NEW: '#00BFFF', // Light Blue
  IN_PROGRESS: '#FFA500', // Orange
  COMPLETED: '#32CD32', // Green
  CANCELLED: '#FF6347', // Red
};

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getAllorders();
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const deleteOrder = async (id) => {
    try {
      const token = localStorage.getItem('token'); // Adjust to where you store your token
      const response = await fetch(`/api/orders/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const result = await response.json();

      if (response.ok) {
        setOrders(orders.filter(order => order.id !== id));
        console.log(`Order ${id} deleted successfully`);
      } else {
        console.error('Error deleting order:', result.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-[#0C7061]">Order History</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-2 md:py-2 md:px-4 border-b text-left">Customer</th>
              <th className="py-2 px-2 md:py-2 md:px-4 border-b text-left">Items</th>
              <th className="py-2 px-2 md:py-2 md:px-4 border-b text-left">Total Quantity</th>
              <th className="py-2 px-2 md:py-2 md:px-4 border-b text-left">Status</th>
              <th className="py-2 px-2 md:py-2 md:px-4 border-b text-left">Total Price</th>
              <th className="py-2 px-2 md:py-2 md:px-4 border-b text-left">Date</th>
              <th className="py-2 px-2 md:py-2 md:px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="py-2 px-2 md:py-2 md:px-4 border-b">{order.name}</td>
                <td className="py-2 px-2 md:py-2 md:px-4 border-b">
                  <ul className="list-inside pl-4">
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - {item.quantity}
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="py-2 px-2 md:py-2 md:px-4 border-b">{order.totalQuantity}</td>
                <td className="py-2 px-2 md:py-2 md:px-4 border-b">
                  <span
                    className={`px-2 md:px-3 py-1 rounded`}
                    style={{ backgroundColor: statusColors[order.status], color: 'white' }}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 px-2 md:py-2 md:px-4 border-b">${order.totalPrice.toFixed(2)}</td>
                <td className="py-2 px-2 md:py-2 md:px-4 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="py-2 px-2 md:py-2 md:px-4 border-b">
                  <button
                    onClick={() => deleteOrder(order.id)}
                    className="bg-red-600 text-white px-2 md:px-4 py-1 md:py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderHistoryPage;
