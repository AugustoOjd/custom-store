import { Box, Card, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material'
import React, { FC, useMemo, useState } from 'react'
import { IProduct } from '../../interface';
import NextLink from 'next/link';

interface Props {
    product: IProduct
}

export const ProductCart:FC<Props> = ({product}) => {

    const [IsHovered, setIsHovered] = useState(false)

    
    const productImage = useMemo(() => {
        return IsHovered
        ? `products/${ product.images[1]}`
        : `products/${ product.images[0]}`

    }, [IsHovered, product.images])
    
  return (

        <Grid item 
                xs={6} 
                sm={4} 
                key={product.slug}
                onMouseEnter={ ()=> setIsHovered(true) }
                onMouseLeave={ ()=> setIsHovered(false) }
            >
          <Card>

            <NextLink href={'./product/slug'} passHref prefetch={false}>
                <Link>

                <CardActionArea>
                    <CardMedia 
                    component={'img'} 
                    image={ productImage } 
                    alt={product.title}
                    className='fadeIn'
                    //   onLoad={ }
                    >

                    </CardMedia>
                    </CardActionArea>
                </Link>
            </NextLink>

          </Card>

          <Box sx={{ mt: 1}} className='fadeIn'>
            <Typography fontWeight={700} >{product.title}</Typography>
            <Typography fontWeight={500} >${product.price}</Typography>
          </Box>
        </Grid> 

  )
}