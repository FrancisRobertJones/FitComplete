import { useContext, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { AuthContext } from '@/context/authContext'

const HomepageDashboard = () => {
    const [dashboardSubscription, setDashboardSubscription] = useState<string>()
    const { authedUser } = useContext(AuthContext)

    useEffect(() => {
        if (authedUser.level) {
            if (authedUser.level === 1) {
                setDashboardSubscription("Lite (Free)")
            } else if (authedUser.level === 2) {
                setDashboardSubscription("Basic")
            } else if (authedUser.level === 3) {
                setDashboardSubscription("Premium")
            }
        }
    }, [])


    return (
        <div className='flex justify-center'>

            {authedUser.level ?
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle>Welcome back {authedUser.User?.firstName}</CardTitle>
                        <CardDescription>
                            Lets take a quick look at your account details.
                        </CardDescription>

                    </CardHeader>
                    <CardContent className="space-y-2">
                        <h1 className='text-2xl'>Current tier:</h1>
                        <h4 className='text-6xl'>{dashboardSubscription}</h4>
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
                </Card>
                : <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle>Welcome back {authedUser.User?.firstName}</CardTitle>
                        <CardDescription>
                            Lets take a quick look at your account details.
                        </CardDescription>

                    </CardHeader>
                    <CardContent className="space-y-2 mb-12">
                        <h1 className='text-xl'>Current tier: <span className='font-bold'>None</span></h1>
                    </CardContent>

                    <CardContent className="space-y-6">
                        <h1 className='text-2xl mb-4'>
                            Susbcribe to access our awesome features! Including:
                        </h1>
                   <ul className='leading-relaxed space-y-4'>
                            <li>🥉 Free Workouts</li>
                            <li >🥈 Video Access: Upgrade to unlock video workout tutorials.</li>
                            <li>🥇 Premium Recipes: Elevate your nutrition with healthy recipes.</li>
                        </ul>
                    </CardContent>
                    <CardContent className="space-y-2">
                        <div className='flex justify-between mt-12'>
                            <Button>Subscribe now</Button>
                        </div>
                    </CardContent>
                </Card>
            }

        </div>
    )
}

export default HomepageDashboard