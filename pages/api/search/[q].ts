import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProduct } from '../../../interface';
import Product from '../../../models/Product';

type Data = 
| {message: string}
| IProduct[]

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
    
    switch (req.method) {
        case 'GET':
            return sarchProduct(req, res)
        default:
            return res.status(400).json({message: 'bad request'})
    }
}

const sarchProduct = async (req: NextApiRequest, res: NextApiResponse<Data>)=> {
    
    let {q = ''} = req.query

   
    if( q.length === 0){
        return res.status(400).json({message: 'No especifico query'})
    }

    q = q.toString().toLocaleLowerCase()
    await db.connect()
    
    const products = await Product.find({ $text: {$search: q }}).select('title images price inStock slug -_id').lean()
    
    await db.disconnect()

    return res.status(200).json(products)
}
