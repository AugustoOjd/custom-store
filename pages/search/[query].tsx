import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts';
import { Card, CardActionArea, CardMedia, Grid, Typography } from '@mui/material';
import { initialData } from '../../database/products';
import { Box } from '@mui/system';
import { ProductList } from '../../components/products';
import { useProducts } from '../../hooks';
import { FullScreenLoading } from '../../components/ui';
import { GetServerSideProps } from 'next';
import { dbProducts } from '../../database';
import { IProduct } from '../../interface';

interface Props{
  products: IProduct[]
}

const SearchPage: NextPage<Props> = ({products}) => {


  return (
    <>

    
    <ShopLayout title={'Custom-Store - Search'} pageDescription={'Encuentra los mejores productos personalizados'}>


      <Typography variant='h1' component={'h1'}>
            Buscar Producto
        </Typography>
        <Typography variant='h2' sx={{md: 1}}>
            {}
        </Typography>


        <ProductList products={ products }/>


      {/* <ProductList products={ initialData.products as any}/> */}
      

    </ShopLayout>
    </>
  )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {

  const { query = '' } = params as {query: string}

  if(query.length === 0){
    return{
      redirect: {
        destination: '/',
        permanent: true
      }
    }
  }

  let products = await dbProducts.getProductsByTerm( query )


  // TODO: alternativas de productos
  return {
    props: {
      products
    }, // will be passed to the page component as props
  }
}

export default SearchPage