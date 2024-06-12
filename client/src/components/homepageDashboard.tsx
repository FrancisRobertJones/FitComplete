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
import PaymentFailureAlert from './PaymentFailureAlert'
import HPDIsUserWithCardLevel from './homepagedashboard/isUserWithLevel'

const HomepageDashboard = () => {
    const [dashboardSubscription, setDashboardSubscription] = useState<string>()
    const { authedUser } = useContext(AuthContext)

    useEffect(() => {
        if (authedUser.level) {
            if (authedUser.level === 1) {
                setDashboardSubscription("Lite")
            } else if (authedUser.level === 2) {
                setDashboardSubscription("Basic")
            } else if (authedUser.level === 3) {
                setDashboardSubscription("Premium")
            }
        }
    }, [])


    return (
        <div className='flex justify-center'>


            {authedUser.level !== undefined && authedUser.isPaymentSuccess &&
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
                    {!authedUser.isActive && <CardContent className="space-y-2">
                        <h1 className='text-2xl'>Your account is inactive, please renew if you want to access our content</h1>
                    </CardContent>}
                    {authedUser.isCancelling &&
                        <CardContent className="space-y-2">
                            <h1 className='text-2xl'>We're sad to see you go</h1>
                        </CardContent>
                    }

                    {
                        <HPDIsUserWithCardLevel />
                    }


                    <CardContent className="space-y-2">
                        <div className='flex justify-between'>
                            <Button>Upgrade plan</Button>
                            <Button variant={"destructive"}>Cancel plan</Button>
                        </div>
                    </CardContent>
                </Card>
            }
            {authedUser.level === undefined &&
                <Card className="w-[400px]">
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
                </Card>}
            {authedUser.isPaymentSuccess === false &&
                <div className="w-[400px] flex items-center justify-center">

                    <PaymentFailureAlert
                        level={dashboardSubscription}
                    />
                </div>
            }




        </div>
    )
}

export default HomepageDashboard