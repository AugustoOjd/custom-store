import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';
import React from 'react'
import { AuthLayout } from '../../components/layouts'
import NextLink from 'next/link'

const LoginPage = () => {
  return (
    <>
        <AuthLayout title={'Login'}>
            <Box mt={'200px'} sx={{width:350, padding:'10px 20px'}}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant='h1' component={'h1'}> Iniciar sesion</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label={'Correo'} variant={'filled'} fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label={'Password'} variant={'filled'} fullWidth></TextField>
                    </Grid>
                    <Grid item xs={12} >
                        <Button color={'secondary'} className={'circular-btn'} size={'large'} fullWidth>Ingresar</Button>
                    </Grid>
                    <Grid item xs={12} display={'flex'} justifyContent={'end'}>
                        <NextLink href={`/auth/register`} passHref>
                            <Link underline='always'>
                                Registrarse
                            </Link>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </AuthLayout>
    </>
  )
}

export default LoginPage