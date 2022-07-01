import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { UiContext } from '../../context/ui'

export const Navbar = () => {


    const {asPath, push} = useRouter()

    const {toggleSideMenu} = useContext(UiContext)

    const [searchTerm, setSearchTerm] = useState('')
    const [isSearchVisible, setIsSearchVisible] = useState(false)


    const onSearchTerm =()=>{
        if(searchTerm.trim().length === 0)return;

        push(`/search/${searchTerm}`)
    }



    // const navigateTo = (url: string)=>{
    //     push(url)
    //     toggleSideMenu()
    // }

  return (
    <>
        <AppBar>
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

                <Box className='fadeIn' sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'block'}}}>
                    <NextLink href={'/category/men'} passHref>
                        <Link >
                            <Button color={asPath === '/category/men' ? 'primary' : 'info'}>
                                Hombre
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/women'} passHref>
                        <Link>
                            <Button color={asPath === '/category/women' ? 'primary' : 'info'}>
                                Mujeres
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/kids'} passHref>
                        <Link>
                            <Button color={asPath === '/category/kids' ? 'primary' : 'info'}>
                                Kids
                            </Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1} />

                {/* desktop */}
                {/* <IconButton>
                    <SearchOutlined />
                </IconButton> */}

                <Box sx={{ display: { xs: 'none', sm: 'flex'}}}>
                {
                    isSearchVisible
                    ?
                    (<Input
                        
                    className='fadeIn'
                    autoFocus
                    value={searchTerm}
                    onChange={ (e)=> setSearchTerm( e.target.value )}
                    onKeyPress={ (e)=> e.key === 'Enter' ? onSearchTerm() : null}
                    type='text'
                    placeholder="Buscar..."
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            onClick={()=> { setIsSearchVisible(false) }}
                            aria-label="toggle password visibility"
                            >
                                <ClearOutlined />
                            </IconButton>
                        </InputAdornment>
                    }
                    />)
                    :
                    (<IconButton
                        className='fandeIn'
                        onClick={()=> { setIsSearchVisible(true)}}
                    >
                        <SearchOutlined />
                    </IconButton>) 
                    
                }

                </Box>

                {/* mobile */}
                <IconButton
                    sx={{display: {xs: 'flex', sm: 'none'}}}
                    onClick={toggleSideMenu}
                >
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
