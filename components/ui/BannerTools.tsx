import { Box, CardMedia } from '@mui/material'
import React from 'react'

export const BannerTools = () => {
  return (
    <Box sx={{ padding: '0px, 0px'}}>
    <CardMedia
        height={250}
        component={'img'}
        image={'https://m.media-amazon.com/images/S/aplus-media-library-service-media/e50cf322-a2a1-437f-b653-2b28f399a23b.__CR0,0,970,600_PT0_SX970_V1___.jpg'}
        sx={{ mb:3, objectFit: 'fill'}}
    >
        
    </CardMedia>
</Box>
  )
}
