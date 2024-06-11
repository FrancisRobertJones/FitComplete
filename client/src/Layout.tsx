import React, { useEffect, useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthActionType, AuthReducer } from './reducers/authReducer'
import { AuthState } from './models/classes/Auth'
import axios from 'axios'

import { toast } from './components/ui/use-toast'
import { AuthContext } from './context/authContext'
import { Toaster } from './components/ui/toaster'
import { Navbar } from './components/navbar'
import { ILevelCheckRes } from './models/interfaces/level'
import { User } from './models/classes/User'
import { AuthResponse } from './models/interfaces/auth'
import Navbar2 from './components/navbar2'

const Layout = () => {
    const [authedUser, dispatchAuth] = useReducer(AuthReducer, new AuthState(false, null))

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
                const email = res.data.user?.email;
                let level: number | undefined ;
                if(email) {
                     level = await checkLevel(email as string);
                }
                console.log("User data before dispatch:", { ...userData, level });

                dispatchAuth({type:AuthActionType.LOGIN, payload: {...userData, level: level}})
            } else {
                dispatchAuth({ type: AuthActionType.LOGOUT, payload: { isAuthenticated: false, user: null } })
            }
        } catch (err) {
            console.log(err)
        }
    }



    const checkLevel = async (email: string) => {
        try {
            const res = await axios.post<ILevelCheckRes>("http://localhost:3000/orders/level", {"email": email })
            const level = res.data.level;
            return level;
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        checkAuth();
    }, [])


    return (
        <>
            <AuthContext.Provider value={{ dispatchAuth, logOut, authedUser, checkAuth }}>
                <Navbar2 />
                <main className='max-w-screen-xl w-full p-16 my-0 mx-auto'>
                    <Outlet />
                </main>
                <Toaster />

                <footer>

                </footer>
            </AuthContext.Provider>
        </>
    )
}

export default Layout