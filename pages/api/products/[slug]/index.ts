import type { NextApiRequest, NextApiResponse } from 'next'
import {db} from '../../../../database'
import { IProduct } from '../../../../interface';
import {Product} from '../../../../models';

type Data = 
| {message: string}
| IProduct


export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return getSlug(req, res)
        default:
            return res.status(400).json({message: 'bad request'})
    }
}

const getSlug = async (req: NextApiRequest, res: NextApiResponse<Data>)=> {
    
    
    
    await db.connect()
    const {slug} = req.query


    const product = await Product.findOne({slug}).lean()
    
    
    await db.disconnect()
    
    if( !product){
        return res.status(404).json({ message: 'datos no encontrados'})
    }

    product.images = product.images.map( img => {
        return img.includes('http') ? img : `${process.env.HOST_NAME}/products/${img}`
    })

    return res.status(200).json(product)
   
}
