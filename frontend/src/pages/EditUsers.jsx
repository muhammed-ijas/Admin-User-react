import React, { useEffect, useState } from 'react'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'sonner';
import { useAdminEditUserMutation, useGetOneUserMutation } from '../slices/adminApiSlice';
import { useParams } from 'react-router-dom';


function EditUsers() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [image, setImage] = useState(null)
    const [currentImage, setCurrentImage] = useState("");
    const imagePath = "http://localhost:8000/images"
    const dispatch = useDispatch();
    const { userId } = useParams();
    const [getOneUser] = useGetOneUserMutation()
    const [adminEditUser] = useAdminEditUserMutation()

    useEffect(() => {
        async function getUserInfo() {
            const res = await getOneUser(userId)
            setName(res.data?.name)
            setEmail(res.data?.email)
            setImage(res.data?.image)
        }
        getUserInfo()
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            toast.error('Passwords do not match', { style: { color: 'red' } });
        } else {
            try {
                const res = await adminEditUser({
                    _id: userId,
                    name,
                    email,
                    password,
                    image: currentImage
                }).unwrap();
                dispatch(setCredentials({ ...res }));
                toast.success('updated succesfully', { style: { color: 'green' } })
            } catch (error) {
                console.log(error);
            }
        }
    };


    return (
        <div className='flex mt-10 justify-center '>
            <Card className="">
                <CardHeader className={'flex items-center'} >
                    <div>
                        <Avatar>
                            <AvatarImage src={currentImage ? URL.createObjectURL(currentImage) : image && `${imagePath}/${image}`} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </div>
                    <CardTitle className={'capitalize'} >Update User profile </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                        <div className="border w-full p-8 rounded-lg shadow-md">
                            <form onSubmit={handleSubmit}  >
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
                                {/* <div className="mb-4 flex gap-3">
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

                                        />
                                    </div>
                                </div> */}
                                <div className='mb-4 '>
                                    <label htmlFor="confirmPassword" className="block font-bold mb-2 capitalize">
                                        upload image
                                    </label>
                                    <input type="file" onChange={(e) => setCurrentImage(e.target.files[0])} />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-colors duration-300"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                </CardFooter>
            </Card>
        </div>
    )
}

export default EditUsers
