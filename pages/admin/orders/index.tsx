import React from 'react'
import { AdminLayout } from '../../../components/layouts'
import { ProductionQuantityLimits } from '@mui/icons-material';
import { Chip, Grid } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import useSWR from 'swr';
import { IOrder, IUser } from '../../../interface';


const columns:GridColDef[] = [
    { field: 'id', headerName: 'Order ID', width: 250},
    { field: 'email', headerName: 'Correo', width: 250},
    { field: 'name', headerName: 'Nombre', width: 300},
    { field: 'total', headerName: 'Total', width: 250},
    {
        field: 'isPaid',
        headerName: 'Pagada',
        renderCell: ({row}: GridValueGetterParams)=>{
            return row.isPaid
            ? (<Chip variant='outlined' label='Pagada' color='success' />)
            : (<Chip variant='outlined' label='Pendiente' color='error' />)
        },
        width: 150
    },
    { field: 'noProduct', headerName: 'No. productos', align: 'center', width: 200},
    {
        field: 'Check',
        headerName: 'Ver orden',
        renderCell: ({row}: GridValueGetterParams)=>{
            return (
                <a href={`/admin/orders/${row.id}`} target='_blank' rel='noreferrer' >
                    Ver orden
                </a>
            )
        },
        width: 200
    },
    { field: 'createdAt', headerName: 'Creada', width: 250},
]

const OrderPage = () => {

    const { data, error} = useSWR<IOrder[]>('/api/admin/orders')

    if(!data && !error){
        return <></>
    }

    const rows = data!.map(order => ({
        id: order._id,
        email: (order.user as IUser).email,
        name: (order.user as IUser).name,
        total: order.total,
        isPaid: order.isPaid,
        noProduct: order.numberOfItems,
        createdAt: order.createdAt
    }))

  return (
    <AdminLayout title='Ordenes' subTitle='registro de ordenes' icon={<ProductionQuantityLimits/>}>


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

    </AdminLayout>
  )
}

export default OrderPage