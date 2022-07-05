import React, { FC } from 'react'
import { Box } from '@mui/system';
import { IconButton, Typography } from '@mui/material';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
import  { useState} from 'react';
import { ICartProduct } from '../../interface/cart';


interface Props {
  currentValue: number,
  maxValue: number,

  updatedQuantity: (newValue:number)=> void
}

export const ItemCounter:FC<Props> = ({currentValue, maxValue, updatedQuantity}) => {


  const addButtonOrRemove = (value: number)=>{
    if(value === -1){
      if(currentValue === 1) return;

      return updatedQuantity(currentValue - 1)
    }

    if(currentValue >= maxValue) return;

    updatedQuantity(currentValue +1 )

  }


  return (
    <Box display={'flex'} alignItems={'center'}>
        <IconButton onClick={()=> addButtonOrRemove(-1)}>
            <RemoveCircleOutline/>
        </IconButton>
        <Typography sx={{ width: 40, textAlign:'center'}}>{currentValue}</Typography>
        <IconButton onClick={()=> addButtonOrRemove(+1)}>
            <AddCircleOutline/>
        </IconButton>
    </Box>
  )
}
