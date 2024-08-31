import React, { useState, useEffect } from 'react';
import { getAllusers, deleteUser, updateUserRole } from '../../services/userServices';

const UserControlPage = () => {
  const [users, setUsers] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getAllusers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const changeUserRole = async (id, newRole) => {
    if (!editMode) return;
    try {
      await updateUserRole(id, newRole); // Update user role in the backend
      const updatedUsers = users.map(user =>
        user._id === id ? { ...user, role: newRole } : user
      );
      setUsers(updatedUsers);
      console.log(`Changed role for user ${id} to ${newRole}`);
    } catch (error) {
      console.error('Error changing user role:', error);
    }
  };

  const removeUser = async (id, role) => {
    if (!editMode || role === 'admin') {
      setMessage('Admin users cannot be deleted.');
      return;
    }
    try {
      await deleteUser(id);
      setUsers(prevUsers =>
        prevUsers.filter(user => user._id !== id)
      );
      setMessage('User deleted successfully!');
      console.log(`Deleted user ${id}`);
      
      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-5xl bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold mb-6 text-[#0C7061]">User Control</h1>
        
        {message && (
          <div className="bg-green-500 text-white p-2 rounded mb-4">
            {message}
          </div>
        )}

        <button 
          onClick={toggleEditMode}
          className={`px-4 py-2 rounded text-white ${editMode ? 'bg-red-500' : 'bg-green-500'} mb-4`}
        >
          {editMode ? 'Exit Edit Mode' : 'Enter Edit Mode'}
        </button>

        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id} className={`transition-opacity duration-500 ${user.removing ? 'opacity-0' : 'opacity-100'}`}>
                <td className="py-2 px-4 border-b">{user.name}</td>
                <td className="py-2 px-4 border-b">
                  {editMode ? (
                    <select
                      value={user.role}
                      onChange={(e) => changeUserRole(user._id, e.target.value)}
                      className="border border-gray-300 p-2 rounded bg-white appearance-none"
                      style={{ width: '100%', maxWidth: '150px', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
                    >
                      <option value="user">user</option>
                      <option value="admin">admin</option>
                    </select>
                  ) : (
                    <span>{user.role}</span>
                  )}
                </td>
                <td className="py-2 px-4 border-b">
                  <button 
                    onClick={() => removeUser(user._id, user.role)}
                    className="px-4 py-2 bg-red-500 text-white rounded"
                    disabled={!editMode || user.role === 'admin'}
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

export default UserControlPage;
