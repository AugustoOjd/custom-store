import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';
import React from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link'

const RegisterPage = () => {
  return (
    <>
        <AuthLayout title={'Login'}>
            <Box mt={'200px'} sx={{width:350, padding:'10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component={'h1'}> Crear cuenta</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label={'Nombre'} variant={'filled'} fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label={'Apellido'} variant={'filled'} fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label={'Correo'} variant={'filled'} fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label={'Confirmar Correo'} variant={'filled'} fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label={'Password'} variant={'filled'} fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label={'Confirmar password'} variant={'filled'} fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12} >
                        <Button color={'secondary'} className={'circular-btn'} size={'large'} fullWidth>Ingresar</Button>
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
        </AuthLayout>
    </>
  )
}

export default RegisterPage