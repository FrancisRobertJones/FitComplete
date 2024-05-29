import { User } from "../classes/User";

export interface AuthResponse {
    isAuthenticated: boolean,
    user: User | null
}