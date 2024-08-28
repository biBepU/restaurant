import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getById } from '../../services/services';
import StarRating from '../../components/StarRating/StarRating';
import Tags from '../../components/Tags/Tags';
import Price from '../../components/Price/Price';
import { useCart } from '../../hook/useCart';
import NotFound from '../../components/NotFound/NotFound';
import { useAuth } from '../../hook/useAuth';

export default function FoodPage() {
    const [food, setFood] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { user } = useAuth();

    const calculateAverageRating = (ratings) => {
        if (ratings.length === 0) return 0;

        const totalRating = ratings.reduce((sum, rating) => sum + rating.rating, 0);
        return (totalRating / ratings.length).toFixed(1); // Round to 1 decimal place
    };

    const averageRating = food ? calculateAverageRating(food.ratings) : 0;
    
    useEffect(() => {
        const fetchFoodData = async () => {
            try {
                const data = await getById(id);
                setFood(data);
            } catch (error) {
                console.error('Failed to fetch food data:', error);
                // Optionally set an error state or display a user-friendly message
            }
        };

        fetchFoodData();
    }, [id]);

    const handleAddToCart = () => {
        addToCart(food);
        
            navigate('/cart');
       
    };

    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                // await deleteFood(id); // Implement the deleteFood function in your services
                navigate('/'); // Redirect to the home page or a relevant page
            } catch (error) {
                console.error('Failed to delete food item:', error);
                // Optionally set an error state or display a user-friendly message
            }
        }
    };
    console.log(id)

    

    return (
        <>
            {!food && <NotFound message="Food not Found" linkText="Back to Home Page" />}
            {food && (
                <div className="flex justify-center items-center flex-wrap m-[3rem]">
                    <img
                        className="rounded-[3rem] flex-1 object-cover h-[35rem] m-[1rem]"
                        src={`http://localhost:5000/${food.imageUrl}`}
                        alt={food.name}
                    />
                    <div className="w-full flex flex-col flex-1 rounded-[3rem] p-[2rem] text-black ml-[1rem]">
                        <div className="flex justify-between">
                            <span className="text-[2rem] font-bold">{food.name}</span>
                            <span className={`text-[2.5rem] ${food.favorite ? 'text-[#e72929]' : 'text-gray-500'}`}>
                                ❤
                            </span>
                        </div>
                        <div className="my-[1rem]">
                            <Link to={`/rating/${id}`}>
                                <StarRating stars={parseFloat(averageRating)} size={25} />
                            </Link>
                        </div>
                        <div className="flex flex-wrap mt-[0.7rem]">
                            {food.origins.map(origin => (
                                <span key={origin} className="p-[0.5rem] text-[1.2rem] m-[0.5rem] mr-0 rounded-[2rem] bg-[#f0f8ff]">
                                    {origin}
                                </span>
                            ))}
                        </div>
                        <div className="my-[1rem]">
                            {food.tags && (
                                <Tags tags={food.tags.map(tag => ({ name: tag }))} forFoodPage={true} />
                            )}
                        </div>
                        <div className="mt-[1rem]">
                            <span className="p-[0.6rem] pr-[2rem] rounded-[10rem] text-[1.3rem]">
                                Time to cook about <strong>{food.cookTime}</strong> minutes
                            </span>
                        </div>
                        <div className="text-[1.8rem] mt-[2rem] mr-[2rem] text-green-600">
                            <span className="text-darkgray">Price: </span>
                            <Price price={food.price} />
                        </div>
                        {user && user.role === "admin" ? (
                            <>
                                <Link
                                    to={`/create/${id}`}
                                    className="bg-[#0C7061] flex items-center justify-center text-white text-[1.2rem] py-[1rem] px-[2rem] rounded-full mt-[1rem] hover:opacity-90"
                                  
                                >
                                    Edit
                                </Link>
                                <button
                                    onClick={handleDelete}
                                    className="bg-red-600 text-white text-[1.2rem] py-[1rem] px-[2rem] rounded-full mt-[1rem] hover:opacity-90"
                                >
                                    Delete
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleAddToCart}
                                className="bg-[#0C7061] text-white text-[1.2rem] py-[1rem] px-[2rem] rounded-full mt-[1rem] hover:opacity-90"
                            >
                                Add To Cart
                            </button>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
