import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useAdminLoginMutation } from '../slices/adminApiSlice'
import { setAdminCredentials } from '../slices/adminSlice'
import { toast } from 'sonner';


function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [adminLogin] = useAdminLoginMutation()

    const { adminInfo } = useSelector((state) => state.admin)

    useEffect(() => {
        if (adminInfo) {
            navigate('/admin')
        }
    }, [navigate, adminInfo])



    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await adminLogin({ email, password }).unwrap();
            dispatch(setAdminCredentials({ ...res }))
            toast.success('signed in succesfully', { style: { color: 'green' } })
            navigate('/')
        } catch (error) {
            toast.error(error.data.message, { style: { color: 'red' } })
        }
    };


    return (
        <div className="flex justify-center items-center h-[503px]">
            <div className="p-8 md:w-[400px] rounded-lg shadow-md border">
                <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block font-bold mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full text-black px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="block font-bold mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 "
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors duration-300"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
