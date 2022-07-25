import { DashboardCustomizeOutlined } from '@mui/icons-material'
import { Grid } from '@mui/material'
import React from 'react'
import { AdminLayout } from '../../components/layouts'
import { DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import useSWR from 'swr';
import { IOrder, IProduct } from '../../interface';



const columns:GridColDef[] = [
    { 
        field: 'img', 
        headerName: 'Photo',
        renderCell: ({row}: GridValueGetterParams) =>{
            return(
                <a href={`/product/${row.slug}`}>
                    Producto[slug]
                </a>
            )
        }},
    { field: 'title', headerName: 'Title'},
    { field: 'gender', headerName: 'Gender'},
    { field: 'type', headerName: 'Type'},
    { field: 'inStock', headerName: 'Stock'},
    { field: 'price', headerName: 'Price'},
    { field: 'sizes', headerName: 'Sizes', width: 250},
]

const ProductsPage = () => {


    const { data, error} = useSWR<IProduct[]>('/api/admin/products')

    if(!data && !error){
        return <></>
    }

    const rows = data!.map(product => ({
        id: product._id,
        img: product.images[0],
        title: product.title,
        gender: product.gender,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        sizes: product.sizes,
        slug: product.slug
    }))
    
  return (
    <AdminLayout title='Productos' subTitle='Administrar productos' icon={<DashboardCustomizeOutlined/>}>


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

export default ProductsPage