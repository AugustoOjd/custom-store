import { Grid, Typography } from '@mui/material'
import React from 'react'

export const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography> No. productos</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography>3 items</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Sub total</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography>{`$${154}`}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Impuestos (15%)</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography>{`$${21}`}</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt: 10}}>
            <Typography variant='subtitle1'>Total</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'} sx={{mt: 10}}>
            <Typography variant='subtitle1'>{`$${234}`}</Typography>
        </Grid>
    </Grid>
  )
}
