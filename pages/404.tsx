import React from 'react'
import { ShopLayout } from '../components/layouts'
import { Box, Typography } from '@mui/material';

const Custom404 = () => {
  return (
    <ShopLayout title='Page not found' pageDescription='No hay pagina para mostrar'>
        <Box mt={'300px'} display={'flex'} justifyContent={'center'} alignItems={'center'} height={'calc(100vh- 200px)'} sx={{ flexDirection: {xs: 'column', sm: 'row'}}}>
            <Typography variant='h1' component={'h1'} fontSize={80} fontWeight={200} > 404 |</Typography>
            <Typography ml={2} > No se encontro la pagina </Typography>
        </Box>
    </ShopLayout>
  )
}

export default Custom404