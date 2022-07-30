import type { NextPage } from 'next'
import { ShopLayout } from '../../components/layouts';
import {  Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ProductList } from '../../components/products';
import { GetServerSideProps } from 'next';
import { dbProducts } from '../../database';
import { IProduct } from '../../interface';

interface Props{
  products: IProduct[],
  foundProducts: boolean,
  query: string
}

const SearchPage: NextPage<Props> = ({products, foundProducts, query}) => {


  return (
    <>

    
    <ShopLayout title={'Custom-Store - Search'} pageDescription={'Encuentra los mejores productos personalizados'}>


      <Typography variant='h1' component={'h1'}>
            Buscando Producto
        </Typography>

        {
          foundProducts
          ?
          <Typography variant='h2' sx={{md: 1}} textTransform={'capitalize'} >
            Palabra clave: { query }
          </Typography>
          :
          (
          <>
            <Box display={'flex'}>
              <Typography variant='h2' sx={{md: 1}}>
                No se encontro ningun producto:
              </Typography>
              <Typography variant='h2' sx={{md: 1}} textTransform={'capitalize'}>
                {query}
              </Typography>
            </Box>

          </>
          )
        }



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

  const foundProducts = products.length > 0
  // TODO: alternativas de productos

  if(!foundProducts){
    products = await dbProducts.getAllProducts()
  }

  return {
    props: {
      products,
      foundProducts,
      query
    }, // will be passed to the page component as props
  }
}

export default SearchPage