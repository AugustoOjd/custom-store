import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'

const OrderPage = () => {
  return (
    <ShopLayout title='Resumen de la orden ...' pageDescription='Resumen de orden'>
        <Typography
            variant='h1'
            component={'h1'}
        >
            Orden: ABC123
        </Typography>

        {/* <Chip 
            sx={{my: 2}}
            variant={'outlined'}
            label={'esperando pago'}
            color={'error'}
            icon={<CreditCardOffOutlined/>}
            /> */}

        <Chip 
            sx={{my: 2}}
            variant={'outlined'}
            label={'Orden completada'}
            color={'success'}
            icon={<CreditScoreOutlined/>}
            />

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

                            <h1>Pagar</h1>
                            <Chip 
                                sx={{my: 2}}
                                variant={'outlined'}
                                label={'Orden completada'}
                                color={'success'}
                                icon={<CreditScoreOutlined/>}
                                />
                        </Box>
                    </CardContent>

                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default OrderPage