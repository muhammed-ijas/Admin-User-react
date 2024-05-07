import React from 'react'
import { ModeToggle } from '../mode-toggle'
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAdminLogoutMutation } from '../../slices/adminApiSlice';
import { adminLogout } from '../../slices/adminSlice';

const imagePath = "http://localhost:8000/images"


function AdminHeader() {

    const { adminInfo } = useSelector((state) => state.admin);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [adminLogoutapiCall] = useAdminLogoutMutation()

    const logoutHandler = async () => {
        try {
            await adminLogoutapiCall().unwrap();
            dispatch(adminLogout());
            navigate('/admin/login');
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div>
            <div className='relative w-full h-[10%] p-5 border'>
                <div className='flex justify-between'>
                    <Link to={'/admin'}><h2 className='text-xl sm:text-2xl md:text-4xl font-bold'>Mern Auth</h2></Link>
                    <div className='flex items-center gap-4'>
                        {adminInfo ?
                            <div className='flex gap-2'>
                                <DropdownMenu sideOffset={2}>
                                    <DropdownMenuTrigger className={'mr-8 capitalize font-semibold text-xl outline-none'}>{adminInfo.name}</DropdownMenuTrigger> <DropdownMenuContent>
                                        <DropdownMenuItem><Link to={'/admin/addUser'}><h3 className='capitalize'>add User</h3></Link> </DropdownMenuItem>
                                        <DropdownMenuItem> <h3 className='capitalize' onClick={logoutHandler}>Logout</h3></DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            :
                            <><Link to={'/admin/login'}> <Button variant='outline'><span className='capitalize text-sm mr-2'>signIn</span> </Button></Link>
                                <Link to={'/admin/register'} ><Button variant='outline'><span className='capitalize text-sm mr-2'>signUp</span> </Button></Link>
                            </>
                        }
                        <ModeToggle />
                    </div>
                </div>
            </div >
        </div>
    )
}

export default AdminHeader
