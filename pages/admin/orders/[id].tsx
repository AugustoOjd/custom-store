import { Box, Card, CardContent, Chip, Divider, Grid, Typography } from '@mui/material'
import React from 'react'
import { CartList, OrderSummary } from '../../../components/cart'

import { CreditCardOffOutlined, CreditScoreOutlined, DashboardOutlined } from '@mui/icons-material';
import { GetServerSideProps, NextPage } from 'next';
import { dbOrder } from '../../../database'
import { IOrder } from '../../../interface'
import { AdminLayout } from '../../../components/layouts/AdminLayout';



interface Props{
    order: IOrder
}


const OrderPage: NextPage<Props> = ({order}) => {

    const { shippingAddress } = order;


  return (
    <AdminLayout title='Resumen de la orden' subTitle={`Orden id: ${order._id}`} icon={<DashboardOutlined/>}>

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
                    

                            <Box flexDirection={'column'}>
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
                            
                            </Box>
                        </Box>
                    </CardContent>

                </Card>
            </Grid>
        </Grid>
    </AdminLayout>
  )
}

export const getServerSideProps: GetServerSideProps=async({req, query})=>{

    const { id = '' }= query

    const order = await dbOrder.getOrderById( id.toString() )

    if(!order){
        return{
            redirect:{
                destination: `/admin/orders`,
                permanent: false
            }
        }
    }

    return{
        props:{
            order
        }
    }
}

export default OrderPage