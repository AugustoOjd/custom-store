import { RemoveShoppingCartOutlined } from '@mui/icons-material'
import { Box, Button, Link, Typography } from '@mui/material'
import React from 'react'
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link'

const EmptyPage = () => {
  return (
    <ShopLayout title='Carrito vacio' pageDescription='No hay productos'>

        <Box 
            mt={'300px'}
            display={'flex'} 
            justifyContent={'center'} 
            alignItems={'center'} 
            height={'calc(100vh- 200px)'} 
            sx={{ flexDirection: {xs: 'column', sm: 'row'}}}
            >
            <RemoveShoppingCartOutlined sx={{ fontSize:100}}/>

            <Box 
                display={'flex'}
                flexDirection={'column'}
                alignItems={'center'}
                >
                <Typography variant='h1' component={'h1'} fontSize={80} fontWeight={200} > Su carrito esta vacio</Typography>
                <NextLink href={'/'} passHref>
                    <Link typography={'h4'}>
                        <Button color='secondary'>
                            Regresar
                        </Button>

                    </Link>
                </NextLink>
            </Box>
            

        </Box>

    </ShopLayout>
  )
}

export default EmptyPage