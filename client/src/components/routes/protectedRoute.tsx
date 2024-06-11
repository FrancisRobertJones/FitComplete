import { AuthContext } from '@/context/authContext'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';

interface IProtectedRoute {
    Component: React.ComponentType,
    minLevel: number
}

const ProtectedRoute = ({ Component, minLevel }: IProtectedRoute) => {
    const { authedUser } = useContext(AuthContext)

    if (!authedUser.loggedIn) {
        return <Navigate to="/login" />;
    }
    if (authedUser.isPaymentSuccess === false) {
        return <Navigate to="/payment-error" />;
    }

    if (authedUser.level === undefined || authedUser.level < minLevel) {
        return <Navigate to="/unauthorised" />;
      }

 
     return <Component />;

}

export default ProtectedRoute