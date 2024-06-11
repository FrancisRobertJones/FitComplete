import { AuthContext } from '@/context/authContext'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';

interface IProtectedRoute {
    Component: React.ComponentType,
    minLevel: number
}

const ProtectedRoute = ({ Component, minLevel }: IProtectedRoute) => {
    const { authedUser } = useContext(AuthContext)

    if(authedUser) {
        if (!authedUser.loggedIn) {
            return <Navigate to="/login" />;
        }

    }

    if (authedUser.level === undefined || authedUser.level < minLevel) {
        return <Navigate to="/unauthorised" />;
      }

    if (!authedUser.paymentSuccess) {
        return <Navigate to="/payment-error" />;
    }
 
     return <Component />;

}

export default ProtectedRoute