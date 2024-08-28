import axios from 'axios';

// Utility function to get token from localStorage (adjust as necessary)
const getAuthToken = () => localStorage.getItem('token');

export const createOrder = async (order) => {
    try {
        const token = getAuthToken();
        const { data } = await axios.post('/api/orders/create', order, {
            headers: {
                Authorization: `Bearer ${token}`, // Add token to Authorization header
            },
        });
        return data;
    } catch (error) {
        console.error('Error creating order:', error.response?.data || error.message);
        throw error; // Rethrow error for further handling if needed
    }
};

export const getNewOrderForCurrentUser = async () => {
    try {
        const token = getAuthToken();
        const { data } = await axios.get('/api/orders/newOrderForCurrentUser', {
            headers: {
                Authorization: `Bearer ${token}`, // Add token to Authorization header
            },
        });
        return data;
    } catch (error) {
        console.error('Error fetching new order:', error.response?.data || error.message);
        throw error; // Rethrow error for further handling if needed
    }
};
export const getAllorders = async()=>{
    
        try {
        const token = getAuthToken();
        const { data } = await axios.get('/api/orders', {
            headers: {
                Authorization: `Bearer ${token}`, // Add token to Authorization header
            },
        });
        return data;
    } catch (error) {
        console.error('Error fetching new order:', error.response?.data || error.message);
        throw error; // Rethrow error for further handling if needed
    }
};
