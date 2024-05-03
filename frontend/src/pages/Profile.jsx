import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

function Profile() {
    return (
        <div className='flex items-center justify-center h-screen'>
            <Card className="w-[350px]">
                <CardHeader className={'flex items-center'} >
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <CardTitle>User info</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid w-full items-center gap-4">
                    
                    </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                </CardFooter>
            </Card>
        </div>

    )
}

export default Profile
