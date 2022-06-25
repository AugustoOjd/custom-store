import type { NextApiRequest, NextApiResponse } from 'next'
import {db} from '../../database'
import {seedDataBase} from '../../database'
import {Product} from '../../models';




type Data = {
  message: string
}

export default async function handler(req: NextApiRequest,res: NextApiResponse<Data>) {

  if(process.env.NODE_ENV === 'production'){
    return res.status(401).json({message: 'sin acceso'})
  }

  await db.connect()

  await Product.deleteMany()
  await Product.insertMany( seedDataBase.initialData.products )

  await db.disconnect()

  res.status(201).json({ message: 'Proceso de db seed realizado' })
}