import { Divider, Typography } from '@mui/material';
import React from 'react'
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { BannerKeycaps, FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const KeycapsPage = () => {

    const { products, isLoading, isError} = useProducts('/products?category=keycaps')
    
  return (
    <>
        <ShopLayout title='Keycaps category' pageDescription='categoria de keycaps'>

            <BannerKeycaps/>
            
            <Typography variant='h1' component={'h1'}>Keycaps</Typography>
            <Typography variant='h2' sx={{md: 1}}>
                Lista de keycaps
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

export default KeycapsPage