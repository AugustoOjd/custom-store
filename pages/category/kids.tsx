import { Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const KidPage = () => {

  const { products, isLoading, isError} = useProducts('/products?gender=kid')

  return (
    <>
        <ShopLayout  title='Kid-category' pageDescription='categoria de jovenes'>

        <Typography variant='h1' component={'h1'}>Kids</Typography>
            <Typography variant='h2' sx={{md: 1}}>
                Kids products
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

export default KidPage