import { AuthState } from '@/models/classes/Auth'
import React from 'react'
import { CardContent, CardTitle } from '../ui/card'
import { Button } from '../ui/button'

interface IHPDIsUserNoLevelProps {
    authedUser: AuthState,
    scrollToTarget: () => void
}


const HPDIsUserNoLevel = ({ authedUser, scrollToTarget }: IHPDIsUserNoLevelProps) => {
    return (
        <>
            <CardContent className="space-y-2">
                <h1 className='text-2xl'>Current tier:</h1>
                <h4 className='text-6xl'>None</h4>
            </CardContent>

            <CardContent className="space-y-6">
                <h1 className='text-2xl mb-4'>
                    Register to access our awesome features!
                    <span className='font-bold'> Including:</span>

            </h1>
            <ul className='leading-relaxed space-y-4'>
                <li>🥉 Free Workouts</li>
                <li >🥈 Video Access: Upgrade to unlock video workout tutorials.</li>
                <li>🥇 Premium Recipes: Elevate your nutrition with healthy recipes.</li>
            </ul>
        </CardContent >
            <CardContent className="space-y-2">
                <div className='flex justify-between mt-12'>
                    <Button onClick={scrollToTarget}>Register now</Button>
                </div>
            </CardContent>
        </>

    )
}

export default HPDIsUserNoLevel