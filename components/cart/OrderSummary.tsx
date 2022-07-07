import { Grid, Typography } from '@mui/material'
import React from 'react'
import { useContext } from 'react';
import { CartContext } from '../../context/cart/CartContext';
import { currency } from '../../utils';

export const OrderSummary = () => {

    const { 
        numberOfItems,
        subTotal,
        tax,
        total
    } = useContext(CartContext)

  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography> No. productos</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography>{numberOfItems}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Sub total</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography>{currency.format(subTotal)}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'}>
            <Typography>{currency.format(tax)}</Typography>
        </Grid>
        <Grid item xs={6} sx={{mt: 10}}>
            <Typography variant='subtitle1'>Total</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={'end'} sx={{mt: 10}}>
            <Typography variant='subtitle1'>{currency.format(total)}</Typography>
        </Grid>
    </Grid>
  )
}
