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

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token'); // Adjust to where you store your token
        const ordersData = await fetch('/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }).then(response => response.json());
        setOrders(ordersData);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('token'); // Adjust to where you store your token
      const response = await fetch(`/api/orders/updateStatus/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      const updatedOrder = await response.json();

      if (response.ok) {
        setOrders(orders.map(order =>
          order.id === id ? updatedOrder : order
        ));
        console.log(`Order ${id} status changed to ${newStatus}`);
      } else {
        console.error('Error updating order status:', updatedOrder.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const removeOrderFromUI = (id) => {
    setOrders(orders.filter(order => order.id !== id));
    console.log(`Order ${id} removed from UI`);
  };

  // Filter out completed and cancelled orders
  const filteredOrders = orders.filter(order => 
    order.status !== 'COMPLETED' && order.status !== 'CANCELLED'
  );

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-[#0C7061]">Orders Confirmation</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Customer</th>
            <th className="py-2 px-4 border-b">Items</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{order.name}</td>
              <td className="py-2 px-4 border-b">
                <ul className="list-inside pl-4">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.name} - {item.quantity}
                    </li>
                  ))}
                </ul>
              </td>
              <td className="py-2 px-4 border-b">
                <span
                  className="px-4 py-2 rounded"
                  style={{ backgroundColor: statusColors[order.status], color: 'white' }}
                >
                  {order.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b">
                {order.status === 'NEW' && (
                  <>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'IN_PROGRESS')}
                      className="bg-[#0C7061] text-white px-4 py-2 rounded mr-2 hover:bg-[#0A5B51]"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'CANCELLED')}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      Cancel
                    </button>
                  </>
                )}
                {order.status === 'IN_PROGRESS' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'COMPLETED')}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Complete
                  </button>
                )}
                {(order.status === 'COMPLETED' || order.status === 'CANCELLED') && (
                  <button
                    onClick={() => removeOrderFromUI(order.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersPage;
