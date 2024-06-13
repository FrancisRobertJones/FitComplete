import React, { useEffect, useReducer, useRef, useState } from 'react'
import { AuthActionType, AuthReducer } from './reducers/authReducer'
import { AuthState } from './models/classes/Auth'
import axios from 'axios'
import { toast } from './components/ui/use-toast'
import { AuthContext } from './context/authContext'
import { Toaster } from './components/ui/toaster'
import { ILevelCheckRes } from './models/interfaces/level'
import { User } from './models/classes/User'
import { AuthResponse } from './models/interfaces/auth'
import { IPaymentStatusRes } from './models/interfaces/paymentStatus'
import { IOrderResponse } from './models/interfaces/order'
import CancellationBanner from './components/cancellationBanner'
import { DateTime } from 'luxon';
import { Outlet } from 'react-router-dom'
import IsLoadingScreen from './components/IsLoadingScreen'
import Navbar from './components/navbar'


const Layout = () => {
    const [authedUser, dispatchAuth] = useReducer(AuthReducer, new AuthState(false, null))
    const [isLoading, setIsLoading] = useState(true)


    const logOut = async () => {
        try {
            const res = await axios.post("http://localhost:3000/logout", {}, { withCredentials: true })
            console.log("logged out", res)

            if (res.status === 200) {
                dispatchAuth({ type: AuthActionType.LOGOUT, payload: { isAuthenticated: false, user: null } })
                toast({
                    title: "You have been logged out!",
                    description: "See you next time"
                })
            }
        } catch (error) {
            toast({
                title: "There has been an error!"
            })
            console.log(error)
        }

    }

    const checkAuth = async () => {
        try {
            const res = await axios.get<AuthResponse>("http://localhost:3000/session", { withCredentials: true })
            if (res.data.isAuthenticated) {
                const userData = res.data
                console.log(userData, "this is user data")
                const email = res.data.user?.email;

                let level: number | undefined = undefined;
                let isPaymentSuccess: boolean | undefined = undefined;
                let isActive: boolean | undefined = true;
                let isCancelling: boolean | undefined = false;
                let orderDate: string | undefined = undefined
                let activeUntil: string | undefined = undefined
                let formattedOrderDate: string | undefined = undefined;
                let formattedActiveUntil: string | undefined = undefined;
                let daysUntilPayment: number | undefined = undefined;


                const findDaysUntilRenewal = (orderDate: string, activeUntil: string) => {
                    const dateNow = DateTime.now()
                    const orderDateObj = DateTime.fromISO(orderDate);
                    const activeUntilDateObj = DateTime.fromISO(activeUntil);
                    const differenceInDays = activeUntilDateObj.diff(dateNow, 'days').days;
                    const formattedOrderDate = orderDateObj.toFormat('yyyy-MM-dd');
                    const formattedActiveUntil = activeUntilDateObj.toFormat('yyyy-MM-dd');
                    return {
                        differenceInDays: Math.floor(differenceInDays),
                        formattedOrderDate,
                        formattedActiveUntil
                    };

                }


                if (email && userData) {
                    const orderData = await checkOrder(email as string);
                    console.log(orderData, "THIS IS THE ORDER DATA")
                    if (orderData) {
                        level = orderData.level,
                            isActive = orderData.isActive,
                            isCancelling = orderData.isCancelling,
                            isPaymentSuccess = orderData.isPaymentSuccess,
                            orderDate = orderData.orderDate,
                            activeUntil = orderData.activeUntil
                    }
                    if (orderDate && activeUntil) {
                        const { differenceInDays, formattedOrderDate: formattedOrder, formattedActiveUntil: formattedActive } = findDaysUntilRenewal(orderDate, activeUntil);
                        daysUntilPayment = differenceInDays;
                        formattedOrderDate = formattedOrder;
                        formattedActiveUntil = formattedActive;
                    }
                }

                dispatchAuth({ type: AuthActionType.LOGIN, payload: { ...userData, level: level, isPaymentSuccess: isPaymentSuccess, isActive: isActive, isCancelling: isCancelling, orderDate: formattedOrderDate, activeUntil: formattedActiveUntil, daysUntilPayment: daysUntilPayment } })
            } else {
                dispatchAuth({ type: AuthActionType.LOGOUT, payload: { isAuthenticated: false, user: null } })
            }
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }


    const checkOrder = async (email: string) => {
        try {
            const res = await axios.post<IOrderResponse>("http://localhost:3000/orders/get-one", { "email": email })
            return res.data;
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        checkAuth();
        console.log(">>>>>>>>>>>>> were running auth check")
    }, [])


    return (
        <>
            <AuthContext.Provider value={{ dispatchAuth, logOut, authedUser, checkAuth, isLoading }}>
                <Navbar />
                {authedUser.isCancelling && <CancellationBanner />}
                {isLoading ?
                    <IsLoadingScreen />
                    :

                    <main className='max-w-screen-xl w-full p-16 my-0 mx-auto'>
                        <Outlet />
                    </main>
                }
                <Toaster />

                <footer>

                </footer>
            </AuthContext.Provider>
        </>
    )
}

export default Layout