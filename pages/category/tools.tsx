import { Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { ProductList } from '../../components/products'
import { FullScreenLoading } from '../../components/ui'
import { useProducts } from '../../hooks'

const ToolsPage = () => {

  const { products, isLoading, isError} = useProducts('/products?category=tools')

  return (
    <>
        <ShopLayout  title='Tools category' pageDescription='categoria de tools'>

        <Typography variant='h1' component={'h1'}>Tools</Typography>
            <Typography variant='h2' sx={{md: 1}}>
                Lista de Tools
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

export default ToolsPage