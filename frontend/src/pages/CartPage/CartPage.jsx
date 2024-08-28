import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Price from '../../components/Price/Price';
import { useCart } from '../../hook/useCart';
import NotFound from '../../components/NotFound/NotFound';
import { useAuth } from '../../hook/useAuth';

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useCart();

  const {user} = useAuth();
  const navigate = useNavigate();
  const checkout = ()=>{
    if(user){
    navigate('/checkout')
    }else{
      navigate('/login')
    }
  }

  return (
    <>
      <h1 className='text-3xl mb-2'>Cart Page</h1>

      {cart.items.length === 0 ? (
        <NotFound  />
      ) : (
        <div className='flex flex-wrap gap-2'>
          <ul className='flex flex-col flex-grow gap-2 border border-[#ffbbbb] rounded-lg p-4 list-none'>
            {cart.items.map(item => (
              <li key={item.food.id} className='flex items-center justify-between border-b border-[#e4e4e4] py-2 last:border-none'>
                <div className='flex-shrink-0'>
                  <img
                   src={`http://localhost:5000/${item.food.imageUrl}`}
                    alt={item.food.name}
                    className='w-20 h-20 rounded-full object-cover'
                  />
                </div>
                <div className='flex-1 px-2'>
                  <Link to={`/food/${item.food.id}`} className='text-blue-600 hover:underline'>{item.food.name}</Link>
                </div>
                <div className='flex-shrink-0'>
                  <select
                    value={item.quantity}
                    onChange={e => changeQuantity(item, Number(e.target.value))}
                    className='w-12 border-b border-lightgray text-sm font-light outline-none'
                  >
                    {[...Array(10).keys()].map(i => (
                      <option key={i + 1}>{i + 1}</option>
                    ))}
                  </select>
                </div>
                <div className='flex-shrink-0'>
                  <Price price={item.price} />
                </div>
                <div className='flex-shrink-0 ml-2'>
                  <button
                    onClick={() => removeFromCart(item.food.id)}
                    className='bg-transparent border border-[#e72929] text-[#e72929] py-2 px-4 rounded-lg hover:shadow-md hover:bg-slate-50'
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className='flex flex-col items-center flex-1 h-80 border border-[#ffbbbb] rounded-lg p-4'>
            <div className='flex flex-col items-start flex-3 mb-4'>
              <div className='text-lg mb-2'>
                <span className='text-gray-500'>Count: </span>
                {cart.totalCount}
              </div>
              <div className='text-lg'>
                <span className='text-gray-500'>Price: </span>
                <Price price={cart.totalPrice} />
              </div>
            </div>
            <button
              onClick={checkout}
              className='bg-[#0C7061] text-white py-2 px-4 rounded-lg text-center w-full hover:opacity-80'
            >
              Proceed To Checkout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
