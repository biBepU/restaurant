import axios from "axios";

// Utility functions to manage token
const getAuthToken = () => localStorage.getItem('token');
const setAuthToken = (token) => localStorage.setItem('token', token);

export const getUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export const login = async (email, password) => {
  try {
    const { data } = await axios.post('/api/users/login', { email, password });
    // Store token and user details separately
    setAuthToken(data.token);
    localStorage.setItem('user', JSON.stringify({
      id: data.id,
      email: data.email,
      name: data.name,
      address: data.address,
      role: data.role,
    }));
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error.response?.data || error.message;
  }
}

export const register = async (registerData) => {
  try {
    const { data } = await axios.post('/api/users/register', registerData);
    // Store token and user details separately
    setAuthToken(data.token);
    localStorage.setItem('user', JSON.stringify({
      id: data.id,
      email: data.email,
      name: data.name,
      address: data.address,
      isAdmin: data.isAdmin,
    }));
    return data;
  } catch (error) {
    console.error('Registration error:', error);
    throw error.response?.data || error.message;
  }
}
export const getAllusers = async()=>{
    const {data} = await axios.get('/api/users');
    return data;
};

export const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('token'); // Ensure token is also removed
}


export const deleteUser = async (id) => {
  const response = await axios.delete(`api/users/${id}`);
  return response.data; // This will be the response from your API
};

//  function to update user role
export const updateUserRole = async (id, newRole) => {
  const response = await axios.put(`/api/users/${id}/role`, { role: newRole });
  return response.data;
};

export const updateUserProfile = async (profileData,userId) => {
  console.log(userId)
  try {

    const token = getAuthToken(); // Get the auth token from local storage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/users/profile/${userId}`, profileData, config);
    console.log(data)
    // Update the user details in local storage
    localStorage.setItem('user', JSON.stringify({
      id: data._id,
      email: data.email,
      name: data.name,
      address: data.address,
      role: data.role,
    }));

    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error.response?.data || error.message;
  }
};
export const changeUserPassword = async (oldPassword, newPassword,userId) => {
  try {
    const token = getAuthToken(); // Get the auth token from local storage
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.put(`/api/users/change-password/${userId}`, { oldPassword, newPassword}, config);

    return data; // This will return the success message from the API
  } catch (error) {
    console.error('Error changing password:', error);
    throw error.response?.data || error.message;
  }
};
