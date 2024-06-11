
import { toast } from "@/components/ui/use-toast";
import { AuthState } from "@/models/classes/Auth";
import { AuthResponse } from "@/models/interfaces/auth";

export interface IAuthAction {
    type: AuthActionType;
    payload: AuthResponse
}

export enum AuthActionType {
    LOGIN,
    LOGOUT,
}


export const AuthReducer = (state: AuthState, action: IAuthAction) => {
    switch (action.type) {
        case AuthActionType.LOGIN:
            return new AuthState(action.payload.isAuthenticated, action.payload.user, action.payload.level, action.payload.paymentSuccess)
        case AuthActionType.LOGOUT:
            return new AuthState(false, null)
        default: return new AuthState(false, null)
    }
}