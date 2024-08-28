import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../hook/useAuth';
import Input from '../../components/Input/Input';

export default function Login() {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();
    const navigate = useNavigate();
    const { user, login } = useAuth();

    const [searchParams] = useSearchParams(); 
    const returnUrl = searchParams.get('returnUrl');

    useEffect(() => {
        if (!user) return;
        returnUrl ? navigate(returnUrl) : navigate('/');
    }, [user, navigate, returnUrl]);

    const submit = async ({ email, password }) => {
        await login(email, password);
    };

    return (
        <div className="flex justify-center items-center h-full mt-[3rem]">
            <div className="w-[28rem]">
                <h1 className="text-2xl font-semibold mb-[1rem]">Login Form</h1>
                <form onSubmit={handleSubmit(submit)} noValidate className="flex flex-col justify-center">
                    <Input
                        type="email"
                        label="Email"
                        {...register('email', {
                            required: true,
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
                    <button type='submit'
                        className="w-full px-[1rem] py-[0.5rem] text-white bg-[#0C7061] rounded-md hover:bg-[#0C7061]/80 focus:outline-none mt-[1rem]"
                    >Login</button>
                    <div className="flex justify-center items-center mt-[1rem]">
                        New user? &nbsp;
                        <Link to={`/register${returnUrl ? '?returnUrl=' + returnUrl : ''}`} className="text-[#0C7061] hover:underline">
                            Register Here
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
