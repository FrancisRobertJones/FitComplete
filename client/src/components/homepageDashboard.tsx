import React, { useContext } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AuthContext } from '@/context/authContext'

const HomepageDashboard = () => {
    const { checkAuth, authedUser } = useContext(AuthContext)

    return (
        <div className='flex justify-center'>
            <Card className="w-[400px]">
                <CardHeader>
                    <CardTitle>Welcome back {authedUser.User?.firstName}</CardTitle>
                    <CardDescription>
                        Lets take a quick look at your account details.
                    </CardDescription>

                </CardHeader>

                <CardContent className="space-y-2">
                    <h1 className='text-2xl'>Current tier:</h1>
                    <h4 className='text-6xl'>Premium</h4>
                </CardContent>

                <CardContent className="space-y-2 flex">
                    <div className='flex mt-6 justify-center'>
                        <div className='flex flex-col items-center text-center'>
                            <h4>Membership days</h4>
                            <h2 className='text-6xl'>24</h2>
                        </div>
                        <div className='flex flex-col items-center text-center'>
                            <h4>Workouts completed</h4>
                            <h2 className='text-6xl'>12</h2>
                        </div>
                        <div className='flex flex-col items-center text-center'>
                            <h4>Videos watched</h4>
                            <h2 className='text-6xl'>12</h2>
                        </div>
                        <div className='flex flex-col items-center text-center'>
                            <h4>Recipies made</h4>
                            <h2 className='text-6xl'>12</h2>
                        </div>
                    </div>
                </CardContent>
                <CardContent className="space-y-2">
                    <h1>Your next payment is due in 13 days</h1>
                    <h1>Your membership expires in 13 days</h1>
                </CardContent>
                <CardContent className="space-y-2">
                    <div className='flex justify-between'>
                        <Button>Upgrade plan</Button>
                        <Button variant={"destructive"}>Cancel plan</Button>
                    </div>
                </CardContent>

                <CardFooter>
                </CardFooter>
            </Card>

        </div>
    )
}

export default HomepageDashboard