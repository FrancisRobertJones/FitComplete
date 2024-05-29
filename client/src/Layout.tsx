import React, { useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthActionType, AuthReducer } from './reducers/authReducer'
import { AuthState } from './models/classes/Auth'
import axios from 'axios'

import { toast } from './components/ui/use-toast'
import { AuthContext } from './context/authContext'
import { Toaster } from './components/ui/toaster'
import { Navbar } from './components/navbar'

const Layout = () => {
    const [authedUser, dispatchAuth] = useReducer(AuthReducer, new AuthState(false, null))

    const logOut = async () => {
        try {
          const res = await axios.get("http://localhost:3000/auth/logout", { withCredentials: true })
          dispatchAuth({ type: AuthActionType.LOGOUT, payload: { isAuthenticated: false, user: null } })
        } catch (err) {
          toast({
            title: "You have been logged out!",
            description: "Succesfully logged out"
          })
          console.log(err)
        }
      }

/*     const checkAuth = async () => {
        try {
            const res = await axios.get("http://localhost:3000/auth/authcheck", { withCredentials: true })
            if (res.data.isAuthenticated) {
                const userData = res.data
                console.log(userData, "this is the userdata")
                dispatchAuth({ type: AuthActionType.LOGIN, payload: userData })
                console.log(res.data, "this is the auth data from rendering")
                return res
            } else {
                dispatchAuth({ type: AuthActionType.LOGOUT, payload: { isAuthenticated: false, user: null } })
            }
        } catch (err) {
            console.log(err)
        }
    } */


    return (
        <>
            <AuthContext.Provider value={{ dispatchAuth, logOut, authedUser /* checkAuth */ }}>
            <Navbar />
                <main className='max-w-screen-xl w-full py-12 my-0 mx-auto'>
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