import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link'

const SummaryPage = () => {
  return (
    <ShopLayout title='Resumen de orden' pageDescription='Resumen de orden'>
        <Typography
            variant='h1'
            component={'h1'}
        >
            Carrito
        </Typography>

        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList />
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography
                            variant='h2'
                        >
                            Resumen (3 productos)
                        </Typography>
                        <Divider sx={{ my: 1}}/>

                        <Box display={'flex'} justifyContent={'end'}>
                            <NextLink href={'/checkout/address'} passHref>
                                <Link underline='always'>
                                    Editar envio
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography variant='subtitle1'>Addres de entrega</Typography>
                        <Typography >Nombre y apellido</Typography>
                        <Typography >provincia</Typography>
                        <Typography >ciudad</Typography>
                        <Typography >postal</Typography>

                        <Divider sx={{my:1}}/>


                        <Box display={'flex'} justifyContent={'end'}>
                            <NextLink href={'/cart'} passHref>
                                <Link underline='always'>
                                    Editar productos
                                </Link>
                            </NextLink>

                        </Box>

                        <OrderSummary/>

                        <Box sx={{ mt:3}}>
                            <Button color='secondary' className='circular-btn' fullWidth>
                                Confirmar orden
                            </Button>
                        </Box>
                    </CardContent>

                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SummaryPage