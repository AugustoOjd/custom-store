import { Button, Chip, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system';
import React, {useState} from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { ProductSlideShow, SizeSelector } from '../../components/products';
import { ItemCounter } from '../../components/ui';
import { ICartProduct, IProduct } from '../../interface';
import { FC } from 'react';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { dbProducts } from '../../database';



interface Props{
  product: IProduct
}



const ProductoPage:FC<Props> = ({ product }) => {

    // const router = useRouter()

    // const {products: product, isLoading} = useProducts(`/products/${ router.query.slug }`)

    const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
      _id: product._id, 
      image: product.images[0], 
      price: product.price, 
      size: undefined,
      slug: product.slug, 
      title: product.title,
      gender: product.gender, 
      quantity: 1
    })

  return (
    <>
      <ShopLayout title={product.title} pageDescription={product.description}>
        
        <Grid mt={3} container spacing={3}>

          <Grid item xs={12} sm={7}>
            <ProductSlideShow
              images={product.images}
            />
          </Grid>

          <Grid item xs={12} sm={5}>
            <Box display={'flex'} flexDirection='column'>
              <Typography variant='h1' component={'h1'}>{product.title}</Typography>
              <Typography variant='subtitle1' component={'h2'}>{`$${product.price}`}</Typography>

              <Box sx={{ my: 2}}>
                <Typography variant='subtitle2'>Cantidad</Typography>
                <ItemCounter />
                <SizeSelector 
                // selectedSize={product.sizes} 
                sizes={product.sizes}/>
              </Box>

              {
                product.inStock === 0
                ?
                <Chip label='no hay disponibles' color='error' variant='outlined' />
                :
                (
                  tempCartProduct.size
                  ?

                <Button color='secondary' className='circular-btn'>
                  Agregar al carrito
                </Button>
                :
                <Button disabled color='secondary' className='circular-btn'>
                  Seleccione una talla
                </Button>
                )
              }

              <Box sx={{ mt: 3}}>
                <Typography variant='subtitle2'> Description: </Typography>
                <Typography variant='body2'> {product.description}</Typography>
              </Box>
            </Box>
          </Grid>

        </Grid>

      </ShopLayout>
        

    </>
  )
}


// export const getServerSideProps: GetServerSideProps = async ({params})=> {
//   // Fetch data from external API
//   const { slug = '' }= params as {slug: string}

//   const product = await dbProducts.getProductBySlug(slug)
//   // Pass data to the page via props

//   if(!product){
//     return{
//       redirect: {
//         destination: '/',
//         permanent: false
//       }
//     }
//   }

//   return { 
//     props: { 
//       product
//     } 
//   }
// }


export const getStaticPaths: GetStaticPaths = async (ctx) => {
  
  const productSlugs = await dbProducts.getAllProductSlugs()
  

  return {
    paths: 
    productSlugs.map( ({slug}) => (
      {
        params: {
          slug
        }
      }
    )),
    fallback: 'blocking'
  };
}

export const getStaticProps: GetStaticProps = async ({params})=> {

  const {slug = ''} = params as {slug: string}

  const product = await dbProducts.getProductBySlug( slug )

    if(!product){
    return{
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }
}

export default ProductoPage