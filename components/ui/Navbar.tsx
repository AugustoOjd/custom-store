import { ClearOutlined, KeyboardAltOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { AppBar, Badge, Box, Button, IconButton, Input, InputAdornment, Link, Toolbar, Typography } from '@mui/material'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import { CartContext } from '../../context'
import { UiContext } from '../../context/ui'

export const Navbar = () => {

    const {cart} = useContext(CartContext)

    const totalCart = cart.map(p=> p.quantity)

    const badge = totalCart.reduce((prev: number, current: number)=> prev + current, 0)

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
        <AppBar sx={{ backgroundColor: '#f28f3b'}}>
            <Toolbar>
                {/* <Box > */}
                    <NextLink href={'/'} passHref>

                        <Link  >
                            <Box display={'flex'} alignItems={'center'}>
                                
                                <KeyboardAltOutlined/>
                                <Typography variant='h6' sx={{ ml: 0.5}}> Custom</Typography>
                                <Typography sx={{ ml: 0.5}}> Store</Typography>
                            </Box>
                        </Link>
                    </NextLink>
                {/* </Box> */}


                <Box flex={1} />

                <Box className='fadeIn' sx={{ display: isSearchVisible ? 'none' : { xs: 'none', sm: 'flex'}}}>
                    <NextLink href={'/category/keycaps'} passHref>
                        <Link sx={{ margin: '0px 5px'}}>
                            <Button color={asPath === '/category/keycaps' ? 'primary' : 'info'}>
                                Keycaps
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/keyboards'} passHref>
                        <Link sx={{ margin: '0px 5px'}}>
                            <Button color={asPath === '/category/keyboards' ? 'primary' : 'info'}>
                                Keyboards
                            </Button>
                        </Link>
                    </NextLink>
                    <NextLink href={'/category/tools'} passHref>
                        <Link sx={{ margin: '0px 5px'}}>
                            <Button color={asPath === '/category/tools' ? 'primary' : 'info'}>
                                Tools
                            </Button>
                        </Link>
                    </NextLink>
                </Box>

                <Box flex={1} />

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
                            <Badge badgeContent={badge > 9 ? '9+' : badge} color={'secondary'}>
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
