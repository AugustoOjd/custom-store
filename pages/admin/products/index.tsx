import { AddOutlined, DashboardCustomizeOutlined } from '@mui/icons-material'
import { Box, Button, CardMedia, Grid, Link } from '@mui/material'
import React from 'react'
import { AdminLayout } from '../../../components/layouts'
import { DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import useSWR from 'swr';
import { IOrder, IProduct } from '../../../interface';
import Nextlink from 'next/link'



const columns:GridColDef[] = [
    { 
        field: 'img', 
        headerName: 'Photo',
        renderCell: ({row}: GridValueGetterParams) =>{
            return(
                <a href={`/products/${row.slug}`} target="_blank" rel="noreferrer">
                    <CardMedia
                        component={'img'}
                        className={'fadeIn'}
                        image={row.img}
                    />
                        
                </a>
            )
        }},
    { 
        field: 'title', 
        headerName: 'Title',
        width: 250,
        renderCell: ({row}: GridValueGetterParams)=>{
            return(
                <Nextlink href={`/admin/products/${row.slug}`} passHref>
                    <Link underline='always'>
                        {row.title}
                    </Link>
                </Nextlink>
            )
        }    
    },
    { field: 'category', headerName: 'Category'},
    { field: 'type', headerName: 'Type'},
    { field: 'inStock', headerName: 'Stock'},
    { field: 'price', headerName: 'Price'},
    { field: 'colors', headerName: 'Colors', width: 250},
    { field: 'slug', headerName: 'Slug', width: 250},
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
        category: product.category,
        type: product.type,
        inStock: product.inStock,
        price: product.price,
        colors: product.colors.join(', '),
        slug: product.slug
    }))
    
  return (
    <AdminLayout title='Productos' subTitle='Administrar productos' icon={<DashboardCustomizeOutlined/>}>

        <Box display={'flex'} justifyContent={'end'} sx={{mb: 2}}>
            <Button
                startIcon={<AddOutlined/>}
                color={'secondary'}
                href={'/admin/products/new'}
            >
                Crear Producto
            </Button>

        </Box>

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