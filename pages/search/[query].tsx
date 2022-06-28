import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts';
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { initialData } from '../../database/products';
import { Box } from '@mui/system';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';



const SearchPage: NextPage = () => {

  const { products, isLoading, isError} = useProducts(`/search/${'faltaquery'}`)

  return (
    <>

    
    <ShopLayout title={'Custom-Store - Search'} pageDescription={'Encuentra los mejores productos personalizados'}>


      <Typography variant='h1' component={'h1'}>
            Buscar Producto
        </Typography>
        <Typography variant='h2' sx={{md: 1}}>
            {}
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

export default SearchPage