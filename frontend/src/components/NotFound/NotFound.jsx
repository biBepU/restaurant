import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound({ message, linkRoute, linkText }) {
    const backgroundStyle = {
    backgroundImage: `url(${ '/NotFound.svg'})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    width: '100%',
  };
  return (
    <div style={backgroundStyle} className="flex flex-col justify-center items-center text-[1.5rem] font-light h-[15rem]">
      {message}
      
      <Link 
        to={linkRoute}
        className="text-white bg-[#0C7061] rounded-full py-[0.7rem] px-[1rem] my-[1rem] opacity-80 hover:opacity-100"
      >
        {linkText}
      </Link>
    </div>
  );
}

NotFound.defaultProps = {
  message: "Nothing Found",
  linkRoute: '/',
  linkText: "Go to Home Page"
};
