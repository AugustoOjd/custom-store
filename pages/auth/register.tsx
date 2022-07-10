import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import React, { useState} from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link'
import { storeApi } from '../../api';
import { ErrorOutline } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { valitations } from '../../utils';


type FormData = {
    name: string,
    email: string,
    password: string
}

const RegisterPage = () => {

    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showError, setShowError] = useState(false)

    console.log(errors)

    const onRegister = async ( { name, email, password}: FormData) =>{

        setShowError(false)

        try {
                const { data } = await storeApi.post('/user/register', { name, email, password })
            
                const { token, user } = data
                console.log( {token, user})
        } catch (error) {
                console.log('error en las credenciales')
                setShowError(true)

                setTimeout(() => {
                    setShowError(false)
                }, 3000);

        }
    }


  return (
    <>
        <AuthLayout title={'Login'}>
            
            <form onSubmit={handleSubmit(onRegister)} noValidate>
            <Box mt={'200px'} sx={{width:350, padding:'10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component={'h1'}> Crear cuenta</Typography>
                        <Chip
                            label='Este usuario ya existe'
                            color='error'
                            icon={<ErrorOutline/>}
                            className='fadeIn'
                            sx={{ display: showError ? 'flex' : 'none'}}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                        label={'Nombre'} 
                        variant={'filled'} 
                        fullWidth
                        {...register('name', {required: 'Este campo es requerido', minLength: {value: 2, message: 'Minimo 2 caracteres'}} ) }
                        error={ !!errors.name }
                        helperText={ errors.name?.message }
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField label={'Apellido'} variant={'filled'} fullWidth></TextField>
                    </Grid> */}
                    <Grid item xs={12}>
                        <TextField 
                        type={'email'}
                        label={'Correo'} 
                        variant={'filled'} 
                        fullWidth
                        {...register('email', {required: 'Este campo es requerido', validate: valitations.isEmail} ) }
                        error={ !!errors.email }
                        helperText={ errors.email?.message }
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField 
                        label={'Confirmar Correo'} 
                        variant={'filled'} 
                        fullWidth
                    
                        ></TextField>
                    </Grid> */}
                    <Grid item xs={12}>
                        <TextField 
                        label={'Password'} 
                        variant={'filled'} 
                        fullWidth
                        {...register('password', {required: 'Este campo es requerido', minLength: {value: 6, message: 'Minimo 6 caracteres'}} ) }
                        error={ !!errors.password }
                        helperText={ errors.password?.message }
                        />
                    </Grid>
                    {/* <Grid item xs={12}>
                        <TextField label={'Confirmar password'} variant={'filled'} fullWidth></TextField>
                    </Grid> */}
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
                        <NextLink href={`/auth/login`} passHref>
                            <Link underline='always'>
                                Ya tienes cuenta?
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

export default RegisterPage