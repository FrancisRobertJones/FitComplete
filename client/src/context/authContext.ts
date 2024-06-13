
import { IAuthAction } from "@/reducers/authReducer";
import { Dispatch, createContext } from "react";
import { AuthState } from "../models/classes/Auth";


export interface IAuthContext {
    authedUser: AuthState,
    dispatchAuth: Dispatch<IAuthAction>,
    logOut: () => void,
    checkAuth: () => void,
    isLoading: boolean;
}

export const AuthContext = createContext<IAuthContext>({
    authedUser: new AuthState(false, null),
    logOut: () => { },
    dispatchAuth: () => { },
    checkAuth: () => { },
    isLoading: true
})