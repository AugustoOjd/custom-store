import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import NextLink from 'next/link'
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '../../context'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router';


const SummaryPage = () => {

    const router = useRouter()
    const { shippingAddress, numberOfItems, createOrder, subTotal, total, tax } = useContext(CartContext)

    const [isPosting, setIsPosting] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')


    useEffect(() => {
      if( !Cookies.get('firstName')){
        router.push('/checkout/address')
      }
    }, [router]);

    const onCreateOrder = async () =>{
        setIsPosting(true)
        const { hasError, message } = await createOrder()

        if(hasError){
            setIsPosting(false)
            setErrorMessage(message)
            return
        }

        router.replace(`/orders/${message}`)
    }
    

  return (
    <ShopLayout title='Resumen de orden' pageDescription='Resumen de orden'>
        <Typography
            variant='h1'
            component={'h1'}
        >
            Resumen de la orden
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
                            Resumen: ({numberOfItems >= 99 ? '99+' : numberOfItems} {numberOfItems === 1 ? 'producto' : 'productos'})
                        </Typography>
                        <Divider sx={{ my: 1}}/>

                        <Box display={'flex'} justifyContent={'end'}>
                            <NextLink href={'/checkout/address'} passHref>
                                <Link underline='always'>
                                    Editar envio
                                </Link>
                            </NextLink>
                        </Box>

                        <Typography variant='subtitle1'>Direccion de entrega</Typography>
                        <Typography >{ shippingAddress?.firstName} {shippingAddress?.lastName}</Typography>
                        <Typography >{ shippingAddress?.address}, { shippingAddress?.address2 ? shippingAddress?.address2 : ''}</Typography>
                        <Typography >{ shippingAddress?.provincias}, { shippingAddress?.city}</Typography>
                        <Typography >{ shippingAddress?.zip}</Typography>
                        <Typography >{ shippingAddress?.phone}</Typography>

                        <Divider sx={{my:1}}/>


                        <Box display={'flex'} justifyContent={'end'}>
                            <NextLink href={'/cart'} passHref>
                                <Link underline='always'>
                                    Editar productos
                                </Link>
                            </NextLink>

                        </Box>

                        <OrderSummary orderValues={{ 
                            numberOfItems: numberOfItems,
                            subTotal: subTotal,
                            tax: tax,
                            total: total
    
                        }}
                        />

                        <Box sx={{ mt:3}} display={'flex'} flexDirection={'column'} >
                            <Button 
                            color='secondary' 
                            className='circular-btn' 
                            fullWidth
                            onClick={ onCreateOrder }
                            disabled={isPosting}
                            >
                                Confirmar orden
                            </Button>

                            <Chip
                                color={'error'}
                                label={errorMessage}
                                sx={{display: errorMessage ? 'flex' : 'none', mt: 2}}
                            />
                        </Box>
                    </CardContent>

                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default SummaryPage