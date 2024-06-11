import { User } from "./User";

export class AuthState {
    constructor(
        public loggedIn: boolean,
        public User: User | null,
        public level?: number,
        public paymentSuccess?: boolean
    ){}
}

export class AccountCreation {
    constructor(
        public email: string,
        public firstName: string,
        public lastName: string,
        
    ) { }
}

export class PasswordCheck {
    constructor(
        public password1: string,
        public password2: string,
        public matches: boolean
    ) { }
}
export class AuthCredentials {
    constructor(
        public email: string,
        public password: string
    ) { }
}