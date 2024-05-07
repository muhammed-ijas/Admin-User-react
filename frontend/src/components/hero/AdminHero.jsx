import React, { useEffect, useState } from 'react';
import UserProfiles from '../cards/UserProfiles';
import { useGetUsersMutation } from '../../slices/adminApiSlice';
import { useAdminDeleteUserMutation } from '../../slices/adminApiSlice';
import { toast } from 'sonner';

function AdminHero() {
    const [users, setUsers] = useState([]);
    const [getUsers] = useGetUsersMutation();
    const [adminDeleteUser] = useAdminDeleteUserMutation();
    const [deleteUserId, setDeleteUserId] = useState(null);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const getAllUsers = async () => {
            try {
                const response = await getUsers();
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };
        getAllUsers();
    }, [deleteUserId]);

    async function deleteUser(_id) {
        try {
            const res = await adminDeleteUser({ _id });
            if (res.data) {
                toast.success('User deleted', { style: { color: 'green' } });
                setDeleteUserId(res.data);
            } else {
                toast.error('An error occurred', { style: { color: 'red' } });
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('An error occurred', { style: { color: 'red' } });
        }
    }

    let filteredUsers = users;
    if (search) {
        filteredUsers = users.filter(user =>
            user.name.toLowerCase().includes(search.toLowerCase())||user.email.toLowerCase().includes(search.toLowerCase())
        );
    }

    return (
        <div className='flex-row items-center w-full h-[503px]'>
            <div className='flex justify-center items-center'>
                <h2 className='text-3xl text-center underline mt-2 font-semibold'>Admin Dashboard</h2>
                <input
                    type="text"
                    className='border-2 rounded-md mt-4 h-8 ml-10 outline-dotted'
                    placeholder='Search users here...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
            <div className='flex mt-5 flex-wrap p-10 justify-around'>
                {filteredUsers.map(user => (
                    <UserProfiles
                        key={user._id}
                        _id={user._id}
                        name={user.name}
                        image={user.image}
                        email={user.email}
                        deleteUser={deleteUser}
                    />
                ))}
            </div>
        </div>
    );
}

export default AdminHero;
