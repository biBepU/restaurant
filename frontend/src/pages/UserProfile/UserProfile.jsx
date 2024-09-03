import React, { useState } from 'react';
import { useAuth } from '../../hook/useAuth';
import {  useNavigate } from 'react-router-dom';
import UpdateProfileModal from '../../components/UpdatProfileModal/UpdateProfileModal';
import ChangePasswordModal from '../../components/ChangePassword/ChangePassword';

const UserProfilePage = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const userId = user.id;
  console.log(user)
  
  const navigate = useNavigate();
  const handleUpdateProfile = async (profileData) => {
    await updateProfile(profileData,userId);
    setProfileModalOpen(false);
  };

  const handleChangePassword = async (passwords) => {
    await changePassword(passwords,userId);
    setPasswordModalOpen(false);
    navigate('/login')

  };

  
  return (
    <div className="bg-gray-50 text-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold text-teal-600 mb-4">Your Profile</h1>
        <p className="text-lg max-w-3xl mx-auto">
          Manage your account details, view your order history, and update your settings.
        </p>
      </section>

      {/* Profile Information Section */}
      <section className="bg-white shadow rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Profile Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Name
            </label>
            <p className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md">{user.name}</p>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <p className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md">{user.email}</p>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Phone Number
            </label>
            <p className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md">{user.phone}</p>
          </div>
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Address
            </label>
            <p className="mt-1 p-3 bg-gray-100 border border-gray-300 rounded-md">{user.address}</p>
          </div>
        </div>
        <div className="text-right mt-6">
          <button
            className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700"
            onClick={() => setProfileModalOpen(true)}
          >
            Edit Profile
          </button>
        </div>
      </section>

      {/* Settings Section */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">Account Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Change Password */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Change Password</h3>
            <button
              className="bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700"
              onClick={() => setPasswordModalOpen(true)}
            >
              Change Password
            </button>
          </div>
          
        </div>
      </section>

      {/* Modals */}
      {isProfileModalOpen && (
        <UpdateProfileModal
          isOpen={isProfileModalOpen}
          onClose={() => setProfileModalOpen(false)}
          onSave={handleUpdateProfile}
          initialData={{
            name: user.name,
            email: user.email,
            phone:user.phone,
            address: user.address,
          }}
        />
      )}

      {isPasswordModalOpen && (
        <ChangePasswordModal
          isOpen={isPasswordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
          onSave={handleChangePassword}
        />
      )}
    </div>
  );
};

export default UserProfilePage;
