import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { Product, User } from '../../../models';
import Order from '../../../models/Order';

type Data = 
| {
  numberOfOrders: number,
  paidOrders: number,
  numberOfClients: number,
  numberOfProducts: number,
  productsWithNoInvetory: number,
  lowInventory: number
  notPaidOrders: number
}
| {message: string}

export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
  
    
    switch (req.method) {
        case 'GET':
            
            return adminData(req, res);
    
        default:
            return res.status(400).json({message: 'bad request'})
    }
}

const adminData = async (req: NextApiRequest,res: NextApiResponse<Data>)=> {

    await db.connect()

    const numberOfOrders = await Order.count()
    const paidOrders = await Order.find({ isPaid: true}).count()
    const numberOfClients = await User.find({role: 'client'}).count()
    const numberOfProducts = await Product.count()
    const productsWithNoInvetory = await Product.find({ inStock: 0}).count()
    const lowInventory = await Product.find({ inStock: { $lte: 10 }}).count()


    await db.disconnect()

    return res.status(200).json({
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInvetory,
        lowInventory,
        notPaidOrders: numberOfOrders - paidOrders
    })

}
