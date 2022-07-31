import { Divider, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { BannerKeyboards, FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const KeyboardsPage = () => {

  const { products, isLoading, isError} = useProducts('/products?category=keyboards')

  
  return (
    <>
        <ShopLayout title='Keyboards category' pageDescription='categoria de keyboards'>

          <BannerKeyboards/>

            <Typography variant='h1' component={'h1'}>Keyboards</Typography>
            <Typography variant='h2' sx={{md: 1}}>
                Lista de Keyboards
            </Typography>

            <Divider/>

            {

                isLoading
                ? <FullScreenLoading/>
                : <ProductList products={ products }/>
            }

            
        </ShopLayout>
    </>
  )
}

export default KeyboardsPage