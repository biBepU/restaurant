import React, { useState } from 'react'

import { useCart } from '../../hook/useCart';
import { useAuth } from '../../hook/useAuth';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { createOrder } from '../../services/OrderServices';


import Input from '../../components/Input/Input';
import OrderItemList from '../../components/OrderItemList/OrderItemList';

export default function Checkout() {
    const { cart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [order, setOrder] = useState({ ...cart });
    
    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm();

    const submit = async (data) => {
       
        await createOrder({ ...order, name: data.name, address: data.address });
        localStorage.removeItem("cart");
        
        navigate('/userorderhistory');
        window.location.reload();
    }

    return (
        <form 
            onSubmit={handleSubmit(submit)}
            className="mt-[1rem] flex mb-[6rem] ml-[2rem] flex-wrap items-center justify-center"
        >
            <div className="w-[60rem] mr-[3rem]">
                <h1 className="text-2xl font-bold">OrderForm</h1>
                <div className="flex flex-col w-full">
                    <Input
                        defaultValue={user.name}
                        label="Name"
                        {...register('name')}
                        error={errors.name}
                    />
                    <Input
                        defaultValue={user.address}
                        label="Table No. or Address"
                        {...register('address')}
                        error={errors.address}
                    />
                </div>
                <OrderItemList order={order} />
            </div>
            <div className="flex-basis-[100%] flex justify-center">
                <div className="m-[2rem] w-[50rem]">
                    <button
                        type="submit"
                        className="bg-[#0C7061] text-white py-[0.5rem] px-[1rem] rounded-lg w-full hover:opacity-80"
                    >
                        Checkout
                    </button>
                </div>
            </div>
        </form>
    );
}

