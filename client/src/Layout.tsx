import React, { useReducer } from 'react'
import { Outlet } from 'react-router-dom'
import { AuthActionType, AuthReducer } from './reducers/authReducer'
import { AuthState } from './models/classes/Auth'
import axios from 'axios'

import { toast } from './components/ui/use-toast'
import { AuthContext } from './context/authContext'

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

                <main>
                    <Outlet />
                </main>
                <footer>

                </footer>
            </AuthContext.Provider>
        </>
    )
}

export default Layout