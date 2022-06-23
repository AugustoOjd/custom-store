import React from 'react'
import { ShopLayout } from '../../components/layouts'
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import NextLink from 'next/link'

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
                <NextLink href={`/orders/${ params.row.id }`} passHref>
                    <Link underline='always'>
                        Ver orden
                    </Link>
                </NextLink>
            )
        }
    }
];

const rows= [
    { id: 1, paid: true, fullname: 'luis perez' },
    { id: 2, paid: true, fullname: 'melisa loca' },
    { id: 3, paid: false,fullname: 'eduar focuco' },
]

const HistoryPage = () => {
  return (
    <>
        <ShopLayout title='historial de compra' pageDescription='muestra del historial'>
            <Typography variant='h1' component={'h1'}>Historial de ordenes</Typography>
            
            <Grid container>
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

export default HistoryPage