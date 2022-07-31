import { Box, CardMedia, Typography } from '@mui/material'
import React from 'react'

export const Banner = () => {
  return (
    <Box sx={{ padding: '0px, 0px'}}>
        <CardMedia
            height={400}
            component={'img'}
            image={'https://i.pinimg.com/originals/8d/46/d0/8d46d0bdd9737fd055475533e6f1b13b.jpg'}
            sx={{ mb:3}}
        >
            
        </CardMedia>
    </Box>
  )
}
