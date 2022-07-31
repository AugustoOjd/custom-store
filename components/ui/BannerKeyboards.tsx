import { Box, CardMedia } from '@mui/material'
import React from 'react'

export const BannerKeyboards = () => {
  return (
    <Box sx={{ padding: '0px, 0px'}}>
        <CardMedia
            height={250}
            component={'img'}
            image={'https://www.howtogeek.com/wp-content/uploads/2022/04/keyboard-desktop-rgb-lighting.jpg?height=200p&trim=2,2,2,2'}
            sx={{ mb:3, objectFit: 'fill'}}
        >
            
        </CardMedia>
    </Box>
  )
}
