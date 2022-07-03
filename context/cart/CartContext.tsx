import { createContext } from 'react';
import { ICartProduct } from '../../interface';


interface ContextProps{
    cart: ICartProduct[]
}

export const CartContext = createContext({} as ContextProps)
