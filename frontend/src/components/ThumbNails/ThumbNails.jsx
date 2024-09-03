import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../Price/Price';
import StarRating from '../StarRating/StarRating';
import NotFound from '../NotFound/NotFound';

export default function ThumbNails({ foods }) {
  if (!foods) return <NotFound/>; // Handle case when foods is undefined or null

  // Function to calculate average rating
  const calculateAverageRating = (ratings) => {
    if (!ratings || ratings.length === 0) return 0;
    const total = ratings.reduce((acc, rating) => acc + rating.rating, 0);
    return (total / ratings.length).toFixed(1); // Return average rating rounded to one decimal place
  };

  return (
    <ul className="flex justify-center items-center flex-wrap list-none p-0 z-0">
      {foods && foods.map(food => (
        <li key={food.id} className="m-[0.5rem]">
          <Link
            to={`/food/${food.id}`}
            className="bg-white h-[23.5rem] w-[20rem] border border-gray-200 rounded-2xl shadow-lg hover:bg-gray-100 hover:shadow-2xl flex flex-col overflow-hidden text-gray-600"
          >
            <img
              className="object-cover h-[14.5rem] w-full"
              src={`https://restaurant-42ss.onrender.com/${food.imageUrl}`}
              alt={`Image of ${food.name}`}
            />
            <div className="mt-[0.3rem] p-[0.5rem_1rem] h-[7rem] flex flex-col">
              <div className="flex justify-between items-center">
                <div className="font-bold text-[1.1rem]">{food.name}</div>
                <div className={`text-[1.2rem] ${food.favorite ? 'text-red-600' : 'text-gray-500'}`}>
                  ❤
                </div>
              </div>
              <div className="my-[0.5rem]">
                <StarRating stars={calculateAverageRating(food.ratings)} size={25} />
              </div>
              <div className="flex justify-between items-start">
                <div className="flex flex-wrap gap-[0.3rem]">
                  {food.origins.map(origin => (
                    <span
                      key={origin}
                      className="rounded-[2rem] bg-gray-100 inline-block text-[0.8rem] text-gray-500 px-[0.5rem] mt-[0.2rem]"
                    >
                      {origin}
                    </span>
                  ))}
                </div>
                <div className="text-[0.9rem] text-right">
                  <span>🕒</span> {food.cookTime} mins
                </div>
              </div>
              <div className="text-gray-700 mt-[0.7rem] text-[1.1rem] px-[0.9rem]">
                <Price price={food.price} />
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}
