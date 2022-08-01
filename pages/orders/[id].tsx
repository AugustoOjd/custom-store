import { Box, Button, Card, CardContent, Chip, CircularProgress, Divider, Grid, Link, Typography } from '@mui/material'
import React, {useState } from 'react'
import { CartList, OrderSummary } from '../../components/cart'
import { ShopLayout } from '../../components/layouts'
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrder } from '../../database'
import { IOrder } from '../../interface'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { storeApi } from '../../api'
import { useRouter } from 'next/router'


export type OrderResponseBody ={
    id: string,
    status:
        | 'COMPLETED'
        | 'SAVED'
        | 'APPROVED'
        | 'VOIDED'
        | 'PLAYER_ACTION_REQUIRED' 
        | any
}

interface Props{
    order: IOrder
}


const OrderPage: NextPage<Props> = ({order}) => {

    const router = useRouter()
    const { shippingAddress } = order;

    const [isPaying, setIsPaying] = useState(false)

    const onOrderCompleted = async (details: OrderResponseBody)=>{

        if( details.status !== 'COMPLETED'){
            return alert ('No hay pago en Paypal')
        }

        setIsPaying(true)

        try {
            
            const { data } = await storeApi.post(`/orders/pay`,{
                transactionId: details.id,
                orderId: order._id
            })

            router.reload()

        } catch (error) {

            setIsPaying(false)
            console.log(error)
            alert('Error')
        }
    }

  return (
    <ShopLayout title='Resumen de la orden ...' pageDescription='Resumen de orden'>
        <Typography
            variant='h1'
            component={'h1'}
        >
            Orden: {order._id}
        </Typography>


        {
            order.isPaid
            ?
            (

                <Chip 
                sx={{my: 2}}
                variant={'outlined'}
                label={'Orden completada'}
                color={'success'}
                icon={<CreditScoreOutlined/>}
                />
            )
            :
            (
                <Chip 
                sx={{my: 2}}
                variant={'outlined'}
                label={'esperando pago'}
                color={'error'}
                icon={<CreditCardOffOutlined/>}
                />
            )
        }




        <Grid container>
            <Grid item xs={12} sm={7}>
                <CartList products={order.orderItems} />
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography
                            variant='h2'
                        >
                            Resumen ({ order.numberOfItems} {order.numberOfItems > 1 ? 'productos' : 'producto'})
                        </Typography>
                        <Divider sx={{ my: 1}}/>

                        <Typography variant='subtitle1'>Datos de entrega</Typography>
                        <Typography >{shippingAddress.firstName} {shippingAddress.lastName}</Typography>
                        <Typography >{shippingAddress.provincias}</Typography>
                        <Typography >{shippingAddress.city}</Typography>
                        <Typography >{shippingAddress.zip}</Typography>
                        <Typography >{shippingAddress.phone}</Typography>

                        <Divider sx={{my:1}}/>

                        <OrderSummary orderValues={{
                            numberOfItems: order.numberOfItems,
                            subTotal: order.subTotal,
                            tax: order.tax,
                            total: order.total
                        }}/>

                        <Box sx={{ mt:3}} display={'flex'} flexDirection={'column'}>
                    

                            <Box 
                            display={'flex'} 
                            justifyContent={'center'} 
                            className={'fadeIn'}
                            sx={{display: isPaying ? 'flex' : 'none'}}>
                                <CircularProgress/>
                            </Box>

                            <Box sx={{display: isPaying ? 'none' : 'flex', flex: 1}} flexDirection={'column'}>
                            {
                                order.isPaid
                                ?
                                (
                                    <Chip 
                                    sx={{my: 2}}
                                    variant={'outlined'}
                                    label={'Orden completada'}
                                    color={'success'}
                                    icon={<CreditScoreOutlined/>}
                                    />
                                )
                                :
                                <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {

                                                amount: {
                                                    value: `${order.total}`,
                                                },
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order!.capture().then((details) => {

                                        // ERROR DE TYPADO

                                        onOrderCompleted(details)
                                        // console.log({details})
                                        
                                        
                                        // const name = details.payer.name.given_name;
                                        // alert(`Transaction completed by ${name}`);
                                    });
                                }}
                            />
                            }
                            
                            </Box>
                        </Box>
                    </CardContent>

                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export const getServerSideProps: GetServerSideProps=async({req, query})=>{

    const { id = '' }= query

    const session: any = getSession({req})

    if(!session){
        
        return{
            redirect:{
                destination: `/auth/login?p=/orders/${id}`,
                permanent: false
            }
        }
    }

    const order = await dbOrder.getOrderById( id.toString() )

    if(!order){
        return{
            redirect:{
                destination: `/orders/history`,
                permanent: false
            }
        }
    }

    // if ( order.user !== session.user._id ) {
    //     return {
    //         redirect: {
    //             destination: '/orders/history',
    //             permanent: false,
    //         }
    //     }
    // }

    return{
        props:{
            order
        }
    }
}

export default OrderPage