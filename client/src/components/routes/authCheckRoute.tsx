import { AuthContext } from '@/context/authContext'
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';

interface IAuthCheck {
    Component: React.ComponentType,
}

const AuthCheck = ({ Component }: IAuthCheck) => {
    const { authedUser } = useContext(AuthContext)

    if (!authedUser.loggedIn) {
        return <Navigate to="/login" />;
    }

     return <Component />;

}

export default AuthCheck