import React, { FC } from 'react'
import { IColors } from '../../interface'
import { Box, Button } from '@mui/material';

interface Props{
    selectedColor?: IColors,
    colors: IColors[]

    onSelectedColor: (color: IColors) => void
}

export const SizeSelector:FC<Props> = ({selectedColor, colors, onSelectedColor}) => {
  return (
    <Box>
        {
            colors.map(color => (
                <Button
                    key={color}
                    size='small'
                    color={ selectedColor === color ? 'primary' : 'info'}
                    onClick={ ()=> onSelectedColor(color)}
                >
                    {color}
                </Button>
            ))
        }
    </Box>
  )
}
