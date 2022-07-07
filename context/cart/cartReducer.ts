import { CartState } from './'
import { ICartProduct } from '../../interface';


type CartActionType=
| { type: '[CART] - LoadCart from cookies | storage', payload: ICartProduct[] }
| { type: '[CART] - Update products cart', payload: ICartProduct[]}
| { type: '[CART] - Change cart quantity', payload: ICartProduct}
| { type: '[CART] - Remove product in cart', payload: ICartProduct[]}


export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case '[CART] - LoadCart from cookies | storage':
            
            return{
                ...state,
                cart: [...action.payload]
            }

        case '[CART] - Update products cart':
            return{
                ...state,
                cart: [...action.payload]
            }

        case '[CART] - Change cart quantity':
            return{
                ...state,
                cart: state.cart.map(product=> {
                    if( product._id !== action.payload._id) return product;
                    if( product.size !== action.payload.size) return product;

                    return action.payload
                })
            }        
        case '[CART] - Remove product in cart':
        return{
            ...state,
            cart: [...action.payload]
        }

    
        default:
            return state;
    }
}