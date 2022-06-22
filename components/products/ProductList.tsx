import { Grid } from '@mui/material'
import React, { FC } from 'react'
import { IProduct } from '../../interface'
import { ProductCart } from './ProductCart'

interface Props{
    products: IProduct[]
}

export const ProductList:FC<Props> = ({products}) => {
  return (
    <>
        <Grid mt={2} container spacing={4}>
            {
                products.map( product => (
                    <ProductCart product={ product} key={product.slug} />
                ))
            }
        </Grid>
    </>
  )
}
