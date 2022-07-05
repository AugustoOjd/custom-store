import { CartState } from './'
import { ICartProduct } from '../../interface';


type CartActionType=
| { type: '[CART] - LoadCart from cookies | storage', payload: ICartProduct[] }
| { type: '[CART] - Add Product', payload: ICartProduct[]}

export const cartReducer = (state: CartState, action: CartActionType): CartState => {
    switch (action.type) {
        case '[CART] - LoadCart from cookies | storage':
            
            return{
                ...state
            }

        case '[CART] - Add Product':
            return{
                ...state,
                cart: [...action.payload]
            }
    
        default:
            return state;
    }
}