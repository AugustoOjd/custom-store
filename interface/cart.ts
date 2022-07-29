import {IColors} from './'

export interface ICartProduct {
    _id: string
    image: string;
    price: number;
    colors?: IColors;
    slug: string;
    title: string;
    category: 'keycaps'|'keyboards'|'tools'
    quantity: number
}

