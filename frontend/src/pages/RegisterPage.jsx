import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';



const RegisterPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null)

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [register, { isLoading }] = useRegisterMutation();
    const { userInfo } = useSelector((state) => state.auth);

    useEffect(() => {

        if (userInfo) {
            navigate('/')
        }
    }, [navigate, userInfo])



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('passwords do not match', { style: { color: 'red' } })
        } else {
            try {
                const res = await register({ name, email, password, image }).unwrap();
                dispatch(setCredentials({ ...res }))
                toast.success('sign up succesfully', { style: { color: 'green' } })
                navigate('/')
            } catch (error) {
                switch (error.data.message) {
                    case "Cannot read properties of undefined (reading 'filename')":
                        toast.error('Please Add A Profile Image', { style: { color: 'red' } })
                        break;
                    case "user already exists":
                        toast.error('Email Is Already In Use , Try Differnt Email', { style: { color: 'red' } })
                        break;
                    default:
                        console.error('An error occurred:', error.data.message);
                        toast.error('An error occurred', { style: { color: 'red' } })
                        break;
                }
            }
        }

    };

    return (
        <div className="flex justify-center items-center h-[503px]">
            <div className="border md:w-[400px] p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} >
                    <div className="mb-4 flex flex-row gap-3">
                        <div className='flex flex-col'>

                            <label htmlFor="name" className="block font-bold mb-2">
                                name
                            </label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor="email" className="block font-bold mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">

                    </div>
                    <div className="mb-4 flex gap-3">
                        <div>
                            <label htmlFor="password" className="block font-bold mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-3 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block font-bold mb-2">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                required
                            />
                        </div>
                    </div>
                    <div className='mb-4 '>
                        <label htmlFor="confirmPassword" className="block font-bold mb-2 capitalize">
                            upload image
                        </label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;