import { useState, createContext, useContext } from 'react';
import * as userService from '../services/userServices';
import { toast } from 'react-toastify';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(userService.getUser());

  const login = async (email, password) => {
    try {
      const loggedInUser = await userService.login(email, password);
      setUser(loggedInUser); 
      toast.success('Login Successful');
    } catch (err) {
      toast.error(err.response?.data || 'Login failed. Please try again.');
    }
  };

  const register = async (data) => {
    try {
      const registeredUser = await userService.register(data);
      setUser(registeredUser);
      toast.success('Register Successful');
    } catch (err) {
      toast.error(err.response?.data || 'Registration failed. Please try again.');
    }
  };

  const logout = () => {
    userService.logout();
    setUser(null);
    toast.success('Logout Successful');
  };

  const updateProfile = async (profileData,userId) => {
    
    try {
      const updatedUser = await userService.updateUserProfile(profileData,userId);
      if (updatedUser) {
        setUser(updatedUser);
        toast.success('Profile Update Was Successful');
      }
    } catch (err) {
      toast.error(err.response?.data || 'Profile update failed. Please try again.');
    }
  };

  const changePassword = async (passwords,userId) => {
    try {
      await userService.changeUserPassword(passwords.oldPassword, passwords.newPassword,userId);
      logout();
      toast.success('Password Changed Successfully, Please Login Again!');
    } catch (err) {
      toast.error(err.response?.data || 'Password change failed. Please try again.');
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, register, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
