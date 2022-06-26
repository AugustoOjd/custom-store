import { SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { UiContext } from '../../context/ui'

export const Navbar = () => {


    const router = useRouter()

    const {toggleSideMenu} = useContext(UiContext)

  return (
    <>
        <AppBar>
            <Toolbar>
                <NextLink href={'/'} passHref>

                    <Link display={'flex'} alignItems={'center'} >
                        <Typography variant='h6'> AbaConnect |</Typography>
                        <Typography sx={{ ml: 0.5}}> Shop</Typography>
                    </Link>
                </NextLink>

                <Box flex={1} />

                <Box sx={{ display: { xs: 'none', sm: 'block'}}}>
                    <NextLink href={'/category/men'} passHref>
                        <Link >
                            <Button color={router.asPath === '/category/men' ? 'primary' : 'info'}>
                                Hombre
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/women'} passHref>
                        <Link>
                            <Button color={router.asPath === '/category/women' ? 'primary' : 'info'}>
                                Mujeres
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/kids'} passHref>
                        <Link>
                            <Button color={router.asPath === '/category/kids' ? 'primary' : 'info'}>
                                Kids
                            </Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1} />

                <IconButton>
                    <SearchOutlined />
                </IconButton>

                <NextLink href={'/cart'} passHref>
                    
                    <Link>
                        <IconButton>
                            <Badge badgeContent={2} color={'secondary'}>
                                <ShoppingCartOutlined/> 
                            </Badge>
                        </IconButton>
                    </Link>
                </NextLink>

                <Button onClick={ toggleSideMenu }>
                    Menu
                </Button>


            </Toolbar>
        </AppBar>
    </>
  )
}
