import React from 'react';
import { useLoading } from '../hook/useLoading';

export default function Loading() {
  const { loading } = useLoading();
  
  if (!loading) return null; // Return null instead of nothing to avoid rendering issues

  return (
    <div className="fixed inset-0 bg-[#ffffffea] z-[10000]">
      <div className="flex flex-col justify-center items-center h-[80%] w-full">
        <img 
          src="/loading.svg" 
          className="border-b-[10px] border-b-brown"
          alt="Loading"
        />
        <h1 className="text-brown lowercase">Loading...</h1>
      </div>
    </div>
  );
}
