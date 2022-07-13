import { createContext } from 'react';
import { IUser } from '../../interface';

interface ContextProps {
    isLoggedIn: boolean
    user?: IUser


    loginUser: (email: string, password: string) => Promise<boolean>
    logout: () => void
    registerUser: (name: string, email: string, password: string) => Promise<{hasError: boolean, message?: string | any }>
}



export const AuthContext = createContext({} as ContextProps)