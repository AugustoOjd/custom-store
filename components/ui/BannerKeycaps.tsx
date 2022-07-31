import { Box, CardMedia } from '@mui/material'
import React from 'react'

export const BannerKeycaps = () => {
  return (
    <Box sx={{ padding: '0px, 0px'}}>
        <CardMedia
            height={250}
            component={'img'}
            image={'https://hardzone.es/app/uploads-hardzone.es/2020/03/Keycaps-teclado.jpg'}
            sx={{ mb:3, objectFit: 'fill'}}
        >
            
        </CardMedia>
    </Box>
  )
}
