import React from 'react'
import { FC, useReducer } from 'react';
import { ICartProduct } from '../../interface';
import { CartContext, cartReducer } from './';

export interface CartState{
    cart:ICartProduct[]
}

const CART_INITIAL_STATE: CartState = {
    cart:[]
}

export interface Props{
    children: React.ReactNode
}

export const CartProvider:FC<Props> = ({children}) => {

    const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE)

    const addProductToCart = (product: ICartProduct)=>{
        // dispatch({ type: '[CART] - Add Product', payload: product})
        
        
    
    }

    return (
    <CartContext.Provider value={{
        ...state,
        // metodos
        addProductToCart
    }}>

        {children}
    </CartContext.Provider>

  )
}
