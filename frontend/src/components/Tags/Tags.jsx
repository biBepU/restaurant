import React from 'react';
import { Link } from 'react-router-dom';

export default function Tags({ tags, forFoodPage }) {
  return (
    <div className={`flex flex-wrap ${forFoodPage ? 'justify-start' : 'justify-center'}`}>
      {tags && tags.map(tag => (
        <Link 
          key={tag.name} 
          to={`/tag/${tag.name}`}
          className="bg-gray-200 px-4 py-1.5 mx-1 my-0.5 rounded-full font-bold text-gray-600 text-xl"
        >
          {tag.name}
          {!forFoodPage && ` (${tag.count})`}
        </Link>
      ))}
    </div>
  );
}
