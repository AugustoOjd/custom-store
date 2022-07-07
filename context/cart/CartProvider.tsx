import { FC, useReducer, useEffect } from 'react';
import { ICartProduct } from '../../interface';
import { CartContext, cartReducer } from './';
import Cookie from 'js-cookie'


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

    useEffect(() => {

        const cookieProducts = Cookie.get('cart') ? JSON.parse(Cookie.get('cart')!) : []
        try {
            dispatch({type : '[CART] - LoadCart from cookies | storage', payload: cookieProducts})
        } catch (error) {
            dispatch({type : '[CART] - LoadCart from cookies | storage', payload: []})
        }
        
    }, [])
    

    useEffect(() => {
        Cookie.set('cart', JSON.stringify( state.cart ))
    }, [state.cart])
    

    const addProductToCart = (product: ICartProduct)=>{
        // dispatch({ type: '[CART] - Add Product', payload: product})
        
        const productInCart= state.cart.some( p=> p._id === product._id);
        if(!productInCart) return dispatch({ type: '[CART] - Update products cart', payload: [...state.cart, product]})

        const productInCartSize = state.cart.some( p=> p._id === product._id && p.size === product.size)
        if(!productInCartSize) return dispatch({ type: '[CART] - Update products cart', payload: [...state.cart, product]})

        // Acumulacion

        const updatedProducts = state.cart.map( p => {

            if( p._id !== product._id ) return p;

            if( p.size !== product.size ) return p;

            // act cantidad

            p.quantity += product.quantity;

            return p
        })

        dispatch({ type: '[CART] - Update products cart', payload: updatedProducts })

    }

    const updateCartQuantity = (product: ICartProduct) => {
        dispatch({ type: '[CART] - Change cart quantity', payload: product})
    }

    const removeCartProduct = (product: ICartProduct)=>{
        const productInCart = state.cart.filter( p=> !(p._id === product._id && p.size === product.size))

        dispatch({ type: '[CART] - Remove product in cart', payload: productInCart})

    }

    return (
    <CartContext.Provider value={{
        ...state,
        // metodos
        addProductToCart,
        updateCartQuantity,
        removeCartProduct
    }}>

        {children}
    </CartContext.Provider>

  )
}
