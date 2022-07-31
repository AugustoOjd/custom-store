import type { NextPage } from 'next'
import { ShopLayout } from '../components/layouts';
import { Divider, Typography } from '@mui/material';
import { ProductList } from '../components/products';
import { useProducts } from '../hooks';
import { Banner, FullScreenLoading } from '../components/ui';




const Home: NextPage = () => {

  const { products, isLoading, isError} = useProducts('/products')



  return (
    <>

    
    <ShopLayout title={'Custom-Store - Search'} pageDescription={'Encuentra los mejores productos personalizados'}>

      <Banner />


      <Typography variant='h1' component={'h1'}>
          Custom Store
        </Typography>
        <Typography variant='h2' sx={{md: 1}}>
          Todos los productos
        </Typography>

        <Divider/>  

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
