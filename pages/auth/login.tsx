import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import React, { useState } from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link'
import { useForm } from 'react-hook-form';
import { valitations } from '../../utils';
import { storeApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
import { useContext } from 'react';
import { AuthContext } from '../../context';
import { useRouter } from 'next/router';



type FormData = {
    email: string,
    password: string,
};


const LoginPage = () => {


    const router = useRouter()
    const { loginUser } = useContext( AuthContext )
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

    const [showError, setShowError] = useState(false)

    console.log(errors)

    const onLoginUser = async ({email, password}: FormData)=>{

        setShowError(false)

        const isValidLogin = await loginUser( email, password)

        if(!isValidLogin){
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000);

            return
        }


    //    Navegar a la pantalla que el usuario dejo
        router.replace('/')
    }
    
  return (
    <>
        <AuthLayout title={'Login'}>
            
            <form onSubmit={handleSubmit( onLoginUser )} noValidate>
            <Box mt={'200px'} sx={{width:350, padding:'10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component={'h1'}> Iniciar sesion</Typography>
                        <Chip
                            label='No reconocemos ese usurio'
                            color='error'
                            icon={<ErrorOutline/>}
                            className='fadeIn'
                            sx={{ display: showError ? 'flex' : 'none'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        type={'email'}
                        label={'Correo'} 
                        variant={'filled'} 
                        fullWidth 
                        {...register('email', {required: 'Este campo es requerido', validate: valitations.isEmail} ) }
                        error={ !!errors.email }
                        helperText={ errors.email?.message }
                        >

                        </TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        label={'Password'} 
                        variant={'filled'} 
                        fullWidth
                        {...register('password', {required: 'Este campo es requerido', minLength: { value: 6, message: 'Minimo 6 caracteres' }}  ) }
                        error={ !!errors.password }
                        helperText={ errors.password?.message }
                        >

                        </TextField>
                    </Grid>
                    <Grid item xs={12} >
                        <Button 
                            color={'secondary'} 
                            className={'circular-btn'}
                            size={'large'} 
                            fullWidth
                            type='submit'
                        >Ingresar</Button>
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                        <NextLink href={`/auth/register`} passHref>
                            <Link underline='always'>
                                No tienes cueta?
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>

            </form>
        </AuthLayout>
    </>
  )
}

export default LoginPage