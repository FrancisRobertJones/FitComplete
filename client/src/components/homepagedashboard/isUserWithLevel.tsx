import React from 'react'
import { CardContent } from '../ui/card'
import { AuthState } from '@/models/classes/Auth'
import { Button } from '../ui/button'

interface IHPDIsUserWithCardLevel {
    authedUser: AuthState,
    dashboardSubscription: string
}

const HPDIsUserWithCardLevel = ({ authedUser, dashboardSubscription }: IHPDIsUserWithCardLevel) => {
    return (
        <> 
        <CardContent className="space-y-2">
            <h1 className='text-2xl'>Current tier:</h1>
            <h4 className='text-6xl'>{dashboardSubscription}</h4>
        </CardContent>
            {authedUser.isCancelling &&
                <CardContent className="space-y-2">
                    <h1 className='text-2xl font-bold'>We're sad to see you go</h1>
                </CardContent>
            }
            <CardContent className="space-y-2">
                <div className='mt-6 flex'>
                    <div className='flex flex-col items-center text-center'>
                        <h4>Workouts completed</h4>
                        <h2 className='text-6xl'>12</h2>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <h4>Workouts liked</h4>
                        <h2 className='text-6xl'>4</h2>
                    </div>
                    <div className='flex flex-col items-center text-center'>
                        <h4>Recipies made</h4>
                        <h2 className='text-6xl'>2</h2>
                    </div>
                </div>

            </CardContent>
            <CardContent className="space-y-2">
                <h1>Member since {authedUser.orderDate}</h1>
                {authedUser.isCancelling ? `Your membership ends in ${authedUser.daysUntilPayment} days` : `Your next payment is due in ${authedUser.daysUntilPayment} days`}
            </CardContent>
            <CardContent className="space-y-2">
                <div className='flex justify-between'>
                    <Button>Upgrade plan</Button>
                    <Button variant={"destructive"}>Cancel plan</Button>
                </div>
            </CardContent>
        </>
    )
}

export default HPDIsUserWithCardLevel