import React, { useState } from 'react';

const ChangePasswordModal = ({ isOpen, onClose, onSave }) => {
  const [passwords, setPasswords] = useState({ oldPassword: '', newPassword: '' });

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(passwords);
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Old Password</label>
            <input
              type="password"
              name="oldPassword"
              value={passwords.oldPassword}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg mr-2"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="bg-teal-600 text-white py-2 px-4 rounded-lg">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default ChangePasswordModal;
