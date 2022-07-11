import { IUser } from "../../interface";
import { AuthState } from "./";


type AuthActionType =
| {type: '[AUTH] - Login', payload: IUser}
| {type: '[AUTH] - Logout'}


export const authReducer = (state: AuthState, action: AuthActionType): AuthState=>{

    switch (action.type) {
        case '[AUTH] - Login':
            
            return{
                ...state,
                isLoggedIn: true,
                user: action.payload
            }

        case '[AUTH] - Logout':
        
            return{
                ...state,
                user: undefined,
                isLoggedIn: false
            }
    
        default:
            return state
    }
}


