import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Search() {
  const [term, setTerm] = useState('');
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  useEffect(() => {
    setTerm(searchTerm ?? '');
  }, [searchTerm]);

  const Search = async () => {
    term ? navigate('/search/' + term) : navigate('/');
  };

  return (
    <div className="flex justify-center">
      <input
        type="text"
        placeholder="Search Foods"
        onChange={e => setTerm(e.target.value)}
        onKeyUp={e => e.key === 'Enter' && Search()}
        value={term}
        className="w-full px-4 py-2 rounded-md border border-gray-600 bg-[#F7F5F4] text-gray-500 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={Search}
        className="text-white h-12 w-20 text-base rounded-r-full border-none bg-[#4E7642]  opacity-80 outline-none hover:opacity-100 cursor-pointer"
      >
        Search
      </button>
    </div>
  );
}
