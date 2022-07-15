import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts';
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';
import { FullScreenLoading } from '../components/ui';




const Home: NextPage = () => {

  const { products, isLoading, isError} = useProducts('/products')



  return (
    <>

    
    <ShopLayout title={'Custom-Store - Search'} pageDescription={'Encuentra los mejores productos personalizados'}>


      <Typography variant='h1' component={'h1'}>
          Tienda
        </Typography>
        <Typography variant='h2' sx={{md: 1}}>
          Todos los productos
        </Typography>

        {

          isLoading
          ? <FullScreenLoading/>
          : <ProductList products={ products }/>
        }

      {/* <ProductList products={ initialData.products as any}/> */}
      

    </ShopLayout>
    </>
  )
}
export default Home
