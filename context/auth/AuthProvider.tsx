import Cookies from 'js-cookie';
import { FC, useReducer, useEffect } from 'react';
import { storeApi } from '../../api';
import { IUser } from '../../interface';
import { AuthContext, authReducer} from './'
import axios from 'axios';
import { useRouter } from 'next/router';



export interface AuthState{
    isLoggedIn: boolean
    user?: IUser
}

const AUTH_INITIAL_STATE: AuthState = {
    isLoggedIn: false,
    user: undefined
}

interface Props{
    children: React.ReactNode
}

export const AuthProvider:FC<Props> = ({children}) => {
    

    const [state, dispatch ] = useReducer(authReducer, AUTH_INITIAL_STATE);

    const router = useRouter()

    useEffect(() => {
        checkToken()
    }, [])

    const checkToken = async() =>{


        if(!Cookies.get('token'))return;

        try {
            const { data } = await storeApi.get('/user/validate-token')
            const {token, user } = data

            Cookies.set('token', token);
            dispatch( {type: '[AUTH] - Login', payload: user})

            return true
        } catch (error) {
            Cookies.remove('token')
        }
    }
    
    
    const loginUser = async (email: string, password: string):Promise<boolean> => {

        try {
            const { data } = await storeApi.post('/user/login', { email, password })
            const {token, user } = data

            Cookies.set( 'token', token )
            dispatch( {type: '[AUTH] - Login', payload: user})

            return true
        } catch (error) {
            return false
        }

    }


    const registerUser = async( name: string, email: string, password: string): Promise<{hasError: boolean, message?: string | any }> =>{

        try {
            const { data } = await storeApi.post('/user/register', {name, email, password })
            const {token, user } = data

            Cookies.set( 'token', token )
            dispatch( {type: '[AUTH] - Login', payload: user} )

            return{
                hasError: false
            }
            
        } catch (error) {
            if( axios.isAxiosError(error)){
                return{
                    hasError: true,
                    message: error.response?.data
                }
        }

        return{
            hasError: true,
            message: 'No se pudo crear el usuario - intente de nuevo'
        }
        
        }
    }

    const logout=()=>{
        Cookies.remove('token');
        Cookies.remove('cart');

        router.reload()
    }


    return (
    <AuthContext.Provider value={{
        ...state,
        loginUser,
        registerUser,
        logout

    }}>
        { children }

    </AuthContext.Provider>
    )
}
