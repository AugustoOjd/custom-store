import { Box, CircularProgress, Typography } from '@mui/material'
import React from 'react'

export const FullScreenLoading = () => {
  return (
    <>
        <Box
            mt={'200px'}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={{ xs: 'column', sm: 'row'}}
        >

            <Typography mb={3}>Loading...</Typography>
            <CircularProgress thickness={2}></CircularProgress>
        </Box>
    
    </>
  )
}
