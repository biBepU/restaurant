import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getById, create, update } from '../../services/services'; // Adjust the import path as needed

const FoodForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [foodData, setFoodData] = useState({
    name: '',
    price: '',
    tags: 'Appetizers',
    favorite: false,
    imageUrl: '',
    availability: false,
    origins: '',
    cookTime: '',
    image: null
  });
  const [responseMessage, setResponseMessage] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchFood = async () => {
        try {
          const data = await getById(id);
          setFoodData(data);
        } catch (error) {
          console.error('Error fetching food data:', error);
        }
      };
      fetchFood();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFoodData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    setFoodData(prevState => ({
      ...prevState,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in foodData) {
      formData.append(key, foodData[key]);
    }

    try {
      if (id) {
        // Update food item
        await update(id, formData);
        setResponseMessage('Food item updated successfully!');
      } else {
        // Create food item
        await create(formData);
        setResponseMessage('Food item created successfully!');
      }
      navigate('/');
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage(id ? 'Error updating food item.' : 'Error creating food item.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6 border border-gray-200">
      {responseMessage && <div className="text-center text-red-600 font-medium">{responseMessage}</div>}
      <div>
        <label className="block text-sm font-semibold text-gray-800">Name</label>
        <input
          type="text"
          name="name"
          value={foodData.name}
          onChange={handleChange}
          className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-[#0C7061] focus:border-[#0C7061] sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800">Price</label>
        <input
          type="number"
          name="price"
          value={foodData.price}
          onChange={handleChange}
          className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-[#0C7061] focus:border-[#0C7061] sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800">Tags</label>
        <select
          name="tags"
          value={foodData.tags}
          onChange={handleChange}
          className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-[#0C7061] focus:border-[#0C7061] sm:text-sm"
        >
          <option value="Appetizers">Appetizers</option>
          <option value="Soups & Noodles">Soups & Noodles</option>
          <option value="Main Courses">Main Courses</option>
          <option value="Vegetables & Tofu">Vegetables & Tofu</option>
          <option value="Desserts & Drinks">Desserts & Drinks</option>
        </select>
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="favorite"
          checked={foodData.favorite}
          onChange={handleChange}
          className="h-5 w-5 text-[#0C7061] border-gray-300 rounded"
        />
        <label className="text-sm font-semibold text-gray-800">Favorite</label>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800">Image</label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          className="mt-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#0C7061] file:text-white hover:file:bg-[#0C7061]/80"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800">Image URL (if no file)</label>
        <input
          type="text"
          name="imageUrl"
          value={foodData.imageUrl}
          onChange={handleChange}
          className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-[#0C7061] focus:border-[#0C7061] sm:text-sm"
        />
      </div>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          name="availability"
          checked={foodData.availability}
          onChange={handleChange}
          className="h-5 w-5 text-[#0C7061] border-gray-300 rounded"
        />
        <label className="text-sm font-semibold text-gray-800">Availability</label>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800">Origins</label>
        <input
          type="text"
          name="origins"
          value={foodData.origins}
          onChange={handleChange}
          className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-[#0C7061] focus:border-[#0C7061] sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-800">Cook Time</label>
        <input
          type="text"
          name="cookTime"
          value={foodData.cookTime}
          onChange={handleChange}
          className="mt-2 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-[#0C7061] focus:border-[#0C7061] sm:text-sm"
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-5 border border-transparent rounded-lg shadow-md text-sm font-semibold text-white bg-[#0C7061] hover:bg-[#0C7061]/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0C7061]"
        >
          {id ? 'Update Food' : 'Create Food'}
        </button>
      </div>
    </form>
  );
};

export default FoodForm;
