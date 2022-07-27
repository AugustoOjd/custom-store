import { JoinFull } from "@mui/icons-material"
import { IProduct } from "../interface"
import { Product } from "../models"
import { db } from "./"



export const getProductBySlug = async( slug: string): Promise<IProduct | null> =>{

    await db.connect()


    const product = await Product.findOne({ slug }).lean()


    await db.disconnect()

    if(!product){
        return null
    }

    product.images = product.images.map( img => {
        return img.includes('http') ? img : `${process.env.HOST_NAME}/products/${img}`
    })


    return JSON.parse(JSON.stringify(product))
}

interface ProductSlug{
    slug: string
}

export const getAllProductSlugs = async ():Promise<ProductSlug[]> =>{
    await db.connect()

    const slugs = await Product.find().select('slug -_id').lean()

    await db.disconnect()

    return slugs
}

export const getProductsByTerm = async (term: string): Promise<IProduct[]> => {
    
    term = term.toString().toLocaleLowerCase()
    await db.connect()
    
    const products = await Product.find({ $text: {$search: term }}).select('title images price inStock slug -_id').lean()
    
    await db.disconnect()

    const updatedProducts = products.map(p => {
        p.images = p.images.map( img => {
            return img.includes('http') ? img : `${process.env.HOST_NAME}/products/${img}`
        })

        return p
    })



    return updatedProducts
}

export const getAllProducts = async ():Promise<IProduct[]> =>{

    await db.connect()

    const products = await Product.find().select('-_id').lean()

    await db.disconnect()

    const updatedProducts = products.map(p => {
        p.images = p.images.map( img => {
            return img.includes('http') ? img : `${process.env.HOST_NAME}/products/${img}`
        })

        return p
    })

    return JSON.parse(JSON.stringify(updatedProducts)) 

}