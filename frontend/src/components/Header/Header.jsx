import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Search from '../Search/Search';
import { useCart } from '../../hook/useCart';
import { useAuth } from '../../hook/useAuth';

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const {cart} = useCart();
  const {user,logout} = useAuth();
  const navigate = useNavigate() 
  // Set initial cart count or fetch from state
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logoutHandler =()=>{
      logout();
      navigate('/register')
      
  }

  const userProfilePicture = ''; // Set to empty if no picture is available

  return (
    <nav className="bg-[#0C7061] p-4 sticky top-0 mb-12 z-1">
   
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-white text-2xl font-bold hidden md:inline-block">Restaurant</Link>

        {/* Search Bar and Cart Icon for Mobile */}
        <div className="flex items-center space-x-2 flex-1 mr-3 ">
          <div className="flex-1 mx-2">
            
             <Search/>
          </div>
          <Link to="/cart" className="relative text-gray-300 hover:text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {cart.totalCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-600 rounded-full">
                {cart.totalCount}
              </span>
            )}
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="text-gray-300 hover:text-white">Home</Link>
        { (user && user.role!=="admin")&& <Link to="/cart" className="relative text-gray-300 hover:text-white flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            {cart.totalCount > 0 && (
              <span className=" inline-flex items-center justify-center w-5 h-5 text-xs font-semibold text-white bg-red-600 rounded-full">
                {cart.totalCount}
              </span>
            )}
          </Link>}
          
          <div className="relative">
            <button 
              onClick={toggleDropdown} 
              className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none"
            >
              {userProfilePicture ? (
                <img src={userProfilePicture} alt="User Avatar" className="w-8 h-8 rounded-full" />
              ) : (
                <svg className="w-8 h-8 rounded-full bg-gray-700 p-1" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm0 1.5c3.313 0 6 2.687 6 6v1.5H6v-1.5c0-3.313 2.687-6 6-6z" />
                </svg>
              )}
              
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
               {user && <Link to="/userprofile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>}
                <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About</Link>
                <Link to="/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Services</Link>
                <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</Link>
                {user &&<Link to="/userorderhistory" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Order History</Link>}
               
                {!user && <>
                  <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Login</Link>
                  <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Register</Link>
                </>
                  
                }
                {user && <a onClick={logout} className="block px-4 py-2 text-gray-700 hover:bg-gray-100 cursor-pointer">Logout</a>}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={toggleMobileMenu} 
            className="text-gray-300 hover:text-white focus:outline-none"
          >
            {userProfilePicture ? (
              <img src={userProfilePicture} alt="User Avatar" className="w-8 h-8 rounded-full" />
            ) : (
              <svg className="w-8 h-8 rounded-full bg-gray-700 p-1" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm0 1.5c3.313 0 6 2.687 6 6v1.5H6v-1.5c0-3.313 2.687-6 6-6z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <Link to="/" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Home</Link>
          {user && <Link to="/userprofile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>}
          <Link to="/about" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">About</Link>
          <Link to="/services" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Services</Link>
          <Link to="/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Contact</Link>
          { user&&<Link to="/userorderhistory" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Order History</Link>}
          
           {!user && <>
                  <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Login</Link>
                  <Link to="/register" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Register</Link>
                </>
            }
          {user &&<a onClick={logoutHandler } className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</a>}
        </div>
      )}
    </nav>
  );
}
