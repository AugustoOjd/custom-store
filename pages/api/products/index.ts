import type { NextApiRequest, NextApiResponse } from 'next'
import { db, SHOP_CONSTANTS } from '../../../database';
import { IProduct } from '../../../interface';
import { Product } from '../../../models';

type Data = 
| {message: string}
| IProduct[]

export default function handler( req: NextApiRequest, res: NextApiResponse<Data>) {


    switch (req.method) {
        case 'GET':
            return getProducts(req, res)
        default:
            return res.status(400).json({message: 'bad request'})
    }

}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const {category = 'all'} = req.query

    let condition = {}

    if(category !== 'all' && SHOP_CONSTANTS.validCategories.includes(`${category}`)){
        condition = {category}
    }

    await db.connect()

    const products = await Product.find(condition)
                                    .select('title images price inStock slug -_id')
                                    .lean()


    await db.disconnect()

    const updatedProducts = products.map(p => {
        p.images = p.images.map( img => {
            return img.includes('http') ? img : `${process.env.HOST_NAME}/products/${img}`
        })

        return p
    })



    return res.status(200).json(updatedProducts)

}
