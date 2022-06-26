import { Typography } from '@mui/material';
import React from 'react'
import { ShopLayout } from '../../components/layouts';
import { ProductList } from '../../components/products';
import { FullScreenLoading } from '../../components/ui';
import { useProducts } from '../../hooks';

const MenPage = () => {

    const { products, isLoading, isError} = useProducts('/products?gender=men')
    
  return (
    <>
        <ShopLayout title='Men category' pageDescription='categoria de hombres'>
            
            <Typography variant='h1' component={'h1'}>Men</Typography>
            <Typography variant='h2' sx={{md: 1}}>
                Men products
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

export default MenPage