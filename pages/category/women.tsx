import { Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const WomenPage = () => {

  const { products, isLoading, isError} = useProducts('/products?gender=women')

  
  return (
    <>
        <ShopLayout title='Women category' pageDescription='categoria de mujeres'>

            <Typography variant='h1' component={'h1'}>Women</Typography>
            <Typography variant='h2' sx={{md: 1}}>
                Women products
            </Typography>

            {

                isLoading
                ? <FullScreenLoading/>
                : <ProductList products={ products }/>
            }

            
        </ShopLayout>
    </>
  )
}

export default WomenPage