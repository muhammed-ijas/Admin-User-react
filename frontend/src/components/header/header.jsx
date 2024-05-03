import React, { useDebugValue, useEffect } from 'react'
import { ModeToggle } from '../mode-toggle'
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { logout } from '../../slices/authSlice';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User } from 'lucide-react';


function Header() {

    const { userInfo } = useSelector((state) => state.auth);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutApiCall] = useLogoutMutation();


    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='relative w-full h-[10%] p-5 border'>
            <div className='flex justify-between'>
                <Link to={'/'}><h2 className='text-xl sm:text-2xl md:text-4xl font-bold'>Mern Auth</h2></Link>
                <div className='flex items-center gap-5'>
                    {
                        userInfo ?

                            <div className='flex gap-2'>
                                <Avatar>
                                    <AvatarImage src={userInfo.image} />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <DropdownMenu sideOffset={2}>
                                    <DropdownMenuTrigger className={'mr-8 capitalize font-semibold text-xl outline-none'}>{userInfo.name}</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem><Link to={'/profile'}><h3 className='capitalize'>profile</h3></Link> </DropdownMenuItem>
                                        <DropdownMenuItem> <h3 className='capitalize' onClick={logoutHandler}>Logout</h3></DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            : <><Link to={'/login'}> <Button variant='outline'><span className='capitalize text-sm mr-2'>signIn</span> </Button></Link>
                                <Link to={'/register'} ><Button variant='outline'><span className='capitalize text-sm mr-2'>signUp</span> </Button></Link>
                                <ModeToggle /></>
                    }
                </div>
            </div>
        </div >
    )
}

export default Header
