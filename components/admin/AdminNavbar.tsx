import { AppBar, Box, Button,  Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { CartContext } from '../../context'
import { UiContext } from '../../context/ui'

export const AdminNavbar = () => {


    const {toggleSideMenu} = useContext(UiContext)

  return (
    <>
        <AppBar sx={{ backgroundColor: '#f28f3b'}}>
            <Toolbar>
                {/* <Box > */}
                    <NextLink href={'/'} passHref>

                        <Link  >
                            <Box display={'flex'} alignItems={'center'}>
                                <Typography variant='h6'> Custom</Typography>
                                <Typography sx={{ ml: 0.5}}> Store</Typography>
                            </Box>
                        </Link>
                    </NextLink>
                {/* </Box> */}

                <Box flex={1} />

                {/* mobile
                <IconButton
                    sx={{display: {xs: 'flex', sm: 'none'}}}
                    onClick={toggleSideMenu}
                >
                    <SearchOutlined />
                </IconButton> */}


                <Button onClick={ toggleSideMenu }>
                    Menu
                </Button>


            </Toolbar>
        </AppBar>
    </>
  )
}
