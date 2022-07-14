import { Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout';
import { GetServerSideProps } from 'next';
import { isValidToken } from '../../utils/jwt';
import { jwt } from '../../utils';
import { provincias } from '../../utils/provincias'
import { useForm } from 'react-hook-form';
import Cookie from 'js-cookie';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';


type FormData = {
    firstName: string,
    lastName: string,
    address: string,
    address2?: string,
    zip: string,
    city: string,
    provincias: string,
    phone: string
}

const getAddressFromCookie = ():FormData =>{

    return{
        firstName: Cookie.get( 'firstName') || '',
        lastName: Cookie.get( 'lastName') || '',
        address: Cookie.get( 'address') || '',
        address2: Cookie.get( 'address2') || '',
        zip: Cookie.get( 'zip') || '',
        city: Cookie.get( 'city') || '',
        provincias: Cookie.get( 'provincias') || '',
        phone: Cookie.get( 'phone') || ''
    }
}


const AddressPage = () => {

    const router = useRouter()
    const { updateAddress } = useContext(CartContext)

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: getAddressFromCookie()   
    });


    const onSubmitAddress = (data:FormData)=>{
        updateAddress(data)
        router.push('/checkout/summary')
    }  

  return (
    <>
        <ShopLayout title='Direccion' pageDescription='Formulario de datos'>
            <Typography variant='h1' component={'h1'}>
                Address
            </Typography>
            
            <form onSubmit={handleSubmit( onSubmitAddress)}>

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label='Nombre' 
                    variant='filled' 
                    fullWidth
                    {...register('firstName', {required: 'Este campo es requerido'} ) }
                    error={ !!errors.firstName }
                    helperText={ errors.firstName?.message }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label='Apellido' 
                    variant='filled' 
                    fullWidth
                    {...register('lastName', {required: 'Este campo es requerido'} ) }
                    error={ !!errors.lastName }
                    helperText={ errors.lastName?.message }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label='Direccion' 
                    variant='filled' 
                    fullWidth
                    {...register('address', {required: 'Este campo es requerido'} ) }
                    error={ !!errors.address }
                    helperText={ errors.address?.message }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label='Direccion 2' 
                    variant='filled' 
                    fullWidth
                    {...register('address2' ) }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label='Codigo postal' 
                    variant='filled' 
                    fullWidth
                    {...register('zip', {required: 'Este campo es requerido'} ) }
                    error={ !!errors.zip }
                    helperText={ errors.zip?.message }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label='Ciudad' 
                    variant='filled' 
                    fullWidth
                    {...register('city', {required: 'Este campo es requerido'} ) }
                    error={ !!errors.city }
                    helperText={ errors.city?.message }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <TextField
                            select
                            defaultValue={provincias[0].name}
                            variant='filled'
                            label={'Provincia'}
                            {...register('provincias', {required: 'Este campo es requerido'} ) }
                            error={ !!errors.provincias }
                            helperText={ errors.provincias?.message }
                        >

                            {
                                provincias.map( prov => (
                                    <MenuItem 
                                    key={prov.code}
                                    value={prov.name}
                                    >
                                        {prov.name}
                                    </MenuItem>
                                ))
                            }
                            
                        </TextField>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                    label='Telefono' 
                    variant='filled' 
                    fullWidth
                    {...register('phone', {required: 'Este campo es requerido'} ) }
                    error={ !!errors.phone }
                    helperText={ errors.phone?.message }
                    />
                </Grid>

            </Grid>


            <Box sx={{mt:5}}  display={'flex'} justifyContent={'center'}>
                <Button type='submit' color='secondary' className='cilcular-btn' size='large'>
                    Revisar pedido
                </Button>
            </Box>

            </form>
        </ShopLayout>
    </>

  )
}


// export const getServerSideProps: GetServerSideProps = async ({req})=>{

//     const { token = ''} = req.cookies

//     let isValidToken = false

//     try {
//         await jwt.isValidToken( token );
//         isValidToken = true
//     } catch (error) {
//         isValidToken = false
//     }

//     if(!isValidToken){
//         return{
//             redirect:{
//                 destination: '/auth/login?p=/cart',
//                 permanent: false
//             }
//         }
//     }

//     return {
//         props:{

//         }
//     }
// }

export default AddressPage