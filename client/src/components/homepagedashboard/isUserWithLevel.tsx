import React from 'react'
import { CardContent } from '../ui/card'

const HPDIsUserWithCardLevel = () => {
    return (
        <>
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
        </>
    )
}

export default HPDIsUserWithCardLevel