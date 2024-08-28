import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';

export default function AdminDashboard() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout action
  const logoutHandler = () => {
    logout();
    navigate('/register');
  };

  return (
    <nav className="p-6 sticky top-0 bg-gray-100">
      <header className="sticky top-0 z-10 bg-gray-100 shadow mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#0C7061]">Admin Dashboard</h1>
        <a
          onClick={logoutHandler}
          className="block px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600 transition duration-200 ease-in-out cursor-pointer border border-red-200"
        >
          Logout
        </a>
      </header>

      {/* Navigation Tabs */}
      <nav className="flex flex-wrap justify-center mb-8 space-x-4">
        <Link
          to="/orderscontrol"
          className="px-4 py-2 text-white rounded-lg focus:outline-none bg-gray-400 hover:bg-[#0C7061] text-sm sm:text-base"
        >
          Order Control
        </Link>
        <Link
          to="/ordershistory"
          className="px-4 py-2 text-white rounded-lg focus:outline-none bg-gray-400 hover:bg-[#0C7061] text-sm sm:text-base"
        >
          Order History
        </Link>
        <Link
          to="/usercontrol"
          className="px-4 py-2 text-white rounded-lg focus:outline-none bg-gray-400 hover:bg-[#0C7061] text-sm sm:text-base"
        >
          User Control
        </Link>
        <Link
          to="/create"
          className="px-4 py-2 text-white rounded-lg focus:outline-none bg-gray-400 hover:bg-[#0C7061] text-sm sm:text-base"
        >
          Create Foods
        </Link>
        <Link
          to="" // Corrected the path
          className="px-4 py-2 text-white rounded-lg focus:outline-none bg-gray-400 hover:bg-[#0C7061] text-sm sm:text-base"
        >
          Food Management
        </Link>
      </nav>
    </nav>
  );
}
