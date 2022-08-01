import React, { FC } from 'react'
import { IColors } from '../../interface'
import { Box, Button } from '@mui/material';

interface Props{
    selectedColor?: IColors,
    colors: IColors[]

    onSelctedColor: (color: IColors) => void
}

export const SizeSelector:FC<Props> = ({selectedColor, colors, onSelctedColor}) => {
  return (
    <Box>
        {
            colors.map(color => (
                <Button
                    key={color}
                    size='small'
                    color={ selectedColor === color ? 'primary' : 'info'}
                    onClick={ ()=> onSelctedColor(color)}
                >
                    {color}
                </Button>
            ))
        }
    </Box>
  )
}
