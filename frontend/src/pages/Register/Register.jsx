import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import Input from '../../components/Input/Input';

export default function Register() {
    const [searchParams] = useSearchParams(); 
    const returnUrl = searchParams.get('returnUrl');
    const { user, register: registerUser } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) return;
        returnUrl ? navigate(returnUrl) : navigate('/');
    }, [user, navigate, returnUrl]);

    const {
        handleSubmit,
        register,
        getValues,
        formState: { errors },
    } = useForm();

    const submit = async (data) => {
        await registerUser(data);
    };

    return (
        <div className="flex justify-center items-center h-full mt-[3rem]">
            <div className="w-[25rem]">
                <h1 className="text-2xl font-semibold mb-[1rem]">Register</h1>
                <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col justify-center">
                    <Input
                        type="text"
                        label="Name"
                        {...register('name', {
                            required: true,
                            minLength: 5,
                        })}
                        error={errors.name}
                    />
                    <Input
                        type="email"
                        label="Email"
                        {...register('email', {
                            required: true,
                            minLength: 5,
                            pattern: {
                                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,63}$/i,
                                message: 'Email is not valid',
                            },
                        })}
                        error={errors.email}
                    />
                    <Input
                        type="password"
                        label="Password"
                        {...register('password', {
                            required: true,
                        })}
                        error={errors.password}
                    />
                    <Input
                        type="password"
                        label="Confirm Password"
                        {...register('confirmPassword', {
                            required: true,
                            validate: value =>
                                value !== getValues('password')
                                    ? 'Passwords do not match'
                                    : true,
                        })}
                        error={errors.confirmPassword}
                    />
                    <Input
                        type="text"
                        label="Address"
                        {...register('address', {
                            required: true,
                            minLength: 5,
                        })}
                        error={errors.address}
                    />
                    <button
                        type="submit"
                        className="w-full px-[1rem] py-[0.5rem] text-white bg-[#0C7061] rounded-md hover:bg-[#0C7061]/80 focus:outline-none mt-[1rem]"
                    >
                        Register
                    </button>
                    <div className="flex justify-center items-center mt-[1rem]">
                        Already a user? &nbsp;
                        <Link to={`/login${returnUrl ? '?returnUrl=' + returnUrl : ''}`} className="text-[#0C7061] hover:underline">
                            Login Here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
