
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
   /*          console.log(action.payload.isAuthenticated, "ISAUTH DATA DURING DISPATCH")
            console.log(action.payload.user, "USER DATA DURING DISPATCH")
            console.log(action.payload.level, "level DATA DURING DISPATCH")
            console.log(action.payload.isActive, "isActive DATA DURING DISPATCH")
            console.log(action.payload.isCancelling, "isCancelling DATA DURING DISPATCH")
            console.log(action.payload.isPaymentSuccess, "isPaymentSuccess DATA DURING DISPATCH") */
            return new AuthState(action.payload.isAuthenticated, action.payload.user, action.payload.level, action.payload.isPaymentSuccess, action.payload.isActive, action.payload.isCancelling)
        case AuthActionType.LOGOUT:
            return new AuthState(false, null)
        default: return new AuthState(false, null)
    }
}