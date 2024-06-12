import { toast } from '@/components/ui/use-toast'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ReactivateSubscription = () => {

    const handleReactivation = async (email: string) => {
        try {
            const response = await axios.post("http://localhost:3000/orders/reactivate", { email })
            console.log("user reactivated", response)
            toast({
                title: "Membership reactivated!",
                description: "Welcome back!"
            })
            if(response.status === 200) {
                window.location.href = '/';
            }
        } catch (error) {
            console.log(error, "error reactivating user")
        }
    }

    return { handleReactivation }
}

export default ReactivateSubscription