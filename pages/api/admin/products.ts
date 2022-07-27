import { isValidObjectId } from 'mongoose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database'
import { IProduct } from '../../../interface'
import { Product } from '../../../models'

import { v2 as cloudinary } from 'cloudinary'

cloudinary.config( process.env.CLOUDINARY_URL || '')

type Data = 
| { message: string }
| IProduct[]
| IProduct


export default function handler(req: NextApiRequest,res: NextApiResponse<Data>) {
    

    switch (req.method) {
        case 'GET':
            
            return getProducts(req, res)
    
        case 'PUT':
            
            return updateProducts(req, res)

        case 'POST':
            return createProduct(req, res)

        default:
            return res.status(400).json({ message: 'Bad request' })
    }

    
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    await db.connect()

    const products = await Product.find()
        .sort({title: 'asc'})
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

const updateProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
    
    const {_id = '', images = []} = req.body as IProduct

    if(!isValidObjectId( _id )){
        return res.status(400).json({ message: 'El id del producto no es valido'})
    }
    
    
    if(images.length < 2){
        return res.status(400).json({ message: 'almenos 2 imagenes'})
    }


    try {
        
        await db.connect()

        const product = await Product.findById(_id)
        if(!product){
            await db.disconnect()
            return res.status(400).json({ message: 'no existe un producto con ese id'})
        }

        // https://res.cloudinary.com/custom-store/image/upload/v1658958581/uu49swjvah3slxmftlmg.webp

        product.images.forEach( async (image)=> {
            if(!images.includes(image)){
                const [ fileId, extension ] = image.substring( image.lastIndexOf('/') + 1).split('.')
                console.log( { image, fileId, extension})

                await cloudinary.uploader.destroy( fileId )
            }

        })

        await product.update( req.body )

        await db.disconnect()

        return res.status(200).json(product)
    } catch (error) {
        await db.disconnect()
        console.log(error)
        return res.status(400).json({ message: 'Revisar los logs'})
    }
}

const createProduct = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

    const { images = [] } = req.body as IProduct

    if( images.length < 2){
        return res.status(400).json({message: 'Debe ser 2 imagenes'})
    }

    try {
        
        await db.connect()

        const productDb = await Product.findOne({ slug: req.body.slug })
        if(productDb){
            await db.disconnect()
            return res.status(400).json({message: 'El slug ya existe'})
        }

        const product = await new Product( req.body )
        await product.save()
        
        await db.disconnect()


        return res.status(201).json(product)
    } catch (error) {
        console.log(error)
        await db.disconnect()
        return res.status(400).json({ message: 'Revisar los logs'})
    }
}

