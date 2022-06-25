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


    const selectSlug = await Product.findOne({slug}).lean()
    
    
    await db.disconnect()
    
    if( !selectSlug){
        return res.status(404).json({ message: 'datos no encontrados'})
    }

    return res.status(200).json(selectSlug)
   
}
