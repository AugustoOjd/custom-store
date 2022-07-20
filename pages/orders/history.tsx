import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import NextLink from 'next/link'
import { GetServerSideProps, NextPage } from 'next';
import { getSession } from 'next-auth/react';
import { dbOrder } from '../../database';
import { IOrder } from '../../interface/order';

const columns: GridColDef[]=[
    {field: 'id', headerName: 'ID', width: 100},
    {field: 'fullname', headerName: 'Nombre Completo', width: 300},

    {
        field: 'paid',
        headerName: 'pagada',
        description: 'muestra informacion si esta pagada la orden',
        width: 200,
        renderCell:(params: GridValueGetterParams)=>{
            return (
                params.row.paid
                ? <Chip color='success' label={'Pagada'} variant={'outlined'} />
                : <Chip color='error' label={'No pagada'} variant={'outlined'} />
            )
        }
    },
    {
        field: 'orden', 
        headerName: 'Ver orden', 
        width: 200,
        renderCell: (params: GridValueGetterParams)=>{
            return(
                <NextLink href={`/orders/${ params.row.orderId }`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    }
];

interface Props{
    orders: IOrder[]
}

const HistoryPage: NextPage<Props> = ({orders}) => {

    const rows = orders.map((order, idx)=>({

        id: idx + 1,
        paid: order.isPaid,
        fullname: `${ order.shippingAddress.firstName} ${order.shippingAddress.lastName}`,
        orderId: order._id


    }))

    return (
    <>
        <ShopLayout title='historial de compra' pageDescription='muestra del historial'>
            <Typography variant='h1' component={'h1'}>Historial de ordenes</Typography>
            
            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%'}}>
                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                    
                </Grid>
            </Grid>
        </ShopLayout>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({req})=>{

    const session: any = await getSession({req})

    if(!session){
        return{
            redirect:{
                destination: '/auth/login?=p/orders/history',
                permanent: false
            }
        }
    }

    const orders = await dbOrder.getOrderByUser( session.user._id )

    return {
        props:{
            orders
        }
    }
}

export default HistoryPage