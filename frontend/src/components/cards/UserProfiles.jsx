import {
    Card,
    CardContent,
    CardHeader,
    CardDescription,
    CardTitle,
} from "@/components/ui/card"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { toast } from 'sonner';
import { Link } from 'react-router-dom'

export function UserProfiles({ _id, name, image, email, deleteUser }) {

    const imagePath = "http://localhost:8000/images"

    function showDeletModal() {
        toast('are you sure want to delete this user ?', {
            action: {
                label: 'delete',
                onClick: () => deleteUser(_id),
            },
            cancel: {
                label: 'Cancel',
                onClick: () => console.log('Cancel!'),
            },
            style: { color: 'red' }
        });
    }



    return (
        <Card className="ml-2 mt-3 w-[200px]">
            <CardHeader className={'flex justify-center items-center'}>
                <Avatar >
                    <AvatarImage src={`${imagePath}/${image}`} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <CardTitle>{name}</CardTitle>
                <CardDescription>{email}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={showDeletModal}><MdDelete /></Button>
                    <Link to={`/admin/editUser/${_id}`}><Button variant="outline" ><MdModeEditOutline /></Button></Link>
                </div>
            </CardContent>
        </Card>
    )
}

export default UserProfiles



