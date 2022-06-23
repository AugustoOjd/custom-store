import { Button, FormControl, Grid, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { ShopLayout } from '../../components/layouts/ShopLayout';

const AddressPage = () => {
  return (
    <>
        <ShopLayout title='Direccion' pageDescription='Formulario de datos'>
            <Typography variant='h1' component={'h1'}>
                Address
            </Typography>
            

            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField label='Nombre' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Apellido' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Direccion' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Direccion 2' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Codigo postal' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField label='Ciudad' variant='filled' fullWidth/>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <Select
                            variant='filled'
                            label={'Provincia'}
                            value={1}
                        >
                            <MenuItem value={1}>Santa fe</MenuItem>
                            <MenuItem value={2}>Buenos aires</MenuItem>
                            <MenuItem value={3}>Corrientes</MenuItem>
                            
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            <Box sx={{mt:5}}  display={'flex'} justifyContent={'center'}>
                <Button color='secondary' className='cilcular-btn' size='large'>
                    Revisar pedido
                </Button>
            </Box>
        </ShopLayout>
    </>

  )
}

export default AddressPage