import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import React, { FC } from 'react'
import { initialData } from '../../database/products';
import NextLink from 'next/link'
import { ItemCounter } from '../ui';

const productsInCart = [
    initialData.products[4],
    initialData.products[6],
    initialData.products[2],
]

interface Props {
    editable?: boolean
}


export const CartList:FC<Props> = ({editable}) => {
  return (
    <>
    {
        productsInCart.map(product => (
            <Grid container spacing={2} key={product.slug} sx={{mb:1}}>
                <Grid item xs={3}>
                    {/* llevar a la pagina del producto */}
                    <NextLink href={'/product/slug'} passHref>
                        <Link>
                            <CardActionArea>
                                <CardMedia
                                    image={`/products/${product.images[0]}`}
                                    component='img'
                                    sx={{borderRadius: '5px'}}
                                />
                            </CardActionArea>
                        </Link>
                    </NextLink>
                </Grid>
                <Grid item xs={7}>
                    <Box display={'flex'} flexDirection='column'>
                        <Typography variant='body1'>
                            {product.title}
                        </Typography>
                        <Typography variant='body1'>
                            Talla: <strong>M</strong>
                        </Typography>

                        {
                            editable
                            ? <ItemCounter/>
                            : <Typography variant='h5'>3</Typography>
                        }
                    </Box>
                </Grid>
                <Grid item 
                    xs={2} 
                    display={'flex'}
                    alignItems={'center'}
                    flexDirection={'column'}
                    >
                        <Typography variant='subtitle1'>{`$${product.price}`}</Typography>

                        {
                            editable && ( 
                            <Button color='secondary'>
                                Remover
                            </Button>
                            )
                        }

                </Grid>
            </Grid>
        ))
    }
    </>
  )
}
