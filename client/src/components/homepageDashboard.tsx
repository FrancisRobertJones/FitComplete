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
import HPDIsUserNoLevel from './homepagedashboard/isUserNoLevel'
import HPDIsInactive from './homepagedashboard/isInactive'

interface IHomepageDashboardProps {
    scrollToTarget: () => void
}

const HomepageDashboard = ({ scrollToTarget }: IHomepageDashboardProps) => {
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


            {authedUser.isPaymentSuccess &&
                <Card className="w-[400px]">
                    <CardHeader>
                        <CardTitle>Welcome back {authedUser.User?.firstName}</CardTitle>
                        <CardDescription>
                            Lets take a quick look at your account details.
                        </CardDescription>
                    </CardHeader>

                    {
                        authedUser.isActive &&
                        authedUser.level === undefined &&
                        <HPDIsUserNoLevel
                            authedUser={authedUser}
                            scrollToTarget={scrollToTarget} />
                    }
                    {
                        authedUser.isActive &&
                        authedUser.level && dashboardSubscription &&
                        <HPDIsUserWithCardLevel
                            dashboardSubscription={dashboardSubscription}
                            authedUser={authedUser}
                            scrollToTarget={scrollToTarget}
                        />
                    }
                    {
                        !authedUser.isActive &&
                        <HPDIsInactive
                            scrollToTarget={scrollToTarget}
                        />
                    }
                </Card>
            }

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