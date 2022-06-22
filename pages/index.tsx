import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts';
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { initialData } from '../database/products';
import { Box } from '@mui/system';
import { ProductList } from '../components/products';




const Home: NextPage = () => {
  return (
    <>

    <ShopLayout title={'AbaConnect - Home'} pageDescription={'Encuentra el mejor internet inalambrico'}>


      <Typography variant='h1' component={'h1'}>
          Tienda
        </Typography>
        <Typography variant='h2' sx={{md: 1}}>
          Todos los productos
        </Typography>

      <ProductList products={ initialData.products as any}/>


    </ShopLayout>
    </>
  )
}
export default Home
