import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemIcon, ListItemText, ListSubheader, Typography } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, DashboardCustomizeOutlined, EmailOutlined, EscalatorWarningOutlined, FemaleOutlined, KeyboardAltOutlined, KeyboardCapslockOutlined, KeyboardOptionKeyOutlined, LoginOutlined, MaleOutlined, PeopleAltOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { useRouter } from "next/router";
import {useState, useContext} from 'react';
import { AuthContext, UiContext  } from "../../context";


export const SideMenu = () => {


    const { user, isLoggedIn, logout } = useContext(AuthContext)

    const {isMenuOpen, toggleSideMenu} = useContext(UiContext)

    const [searchTerm, setSearchTerm] = useState('')

    const router = useRouter()


    const onSearchTerm =()=>{
        if(searchTerm.trim().length === 0)return;

        navigateTo(`/search/${searchTerm}`)
    }

    const navigateTo = (url: string)=>{
        router.push(url)
        toggleSideMenu()
    }


  return (
    <Drawer
        open={ isMenuOpen }
        anchor='right'
        onClose={toggleSideMenu}
        sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
    >
        <Box sx={{ width: 250, paddingTop: 5 }}>
            
            <Typography
                display={'flex'}
                alignItems={'center'}
                color={'secondary'}
                sx={{ml: 2}}
                >
                <PeopleAltOutlined/>User: {user?.name.toLocaleUpperCase()}
            </Typography>
                
            <Typography
                display={'flex'}
                alignItems={'center'}
                color={'secondary'}
                sx={{ml: 2, mb: 2}}
                >
                <EmailOutlined/> Email: {user?.email.toLocaleUpperCase()}
                </Typography>

                <Divider/>
            
            <List>

                <ListItem>
                    <Input
                        autoFocus
                        value={searchTerm}
                        onChange={ (e)=> setSearchTerm( e.target.value )}
                        onKeyPress={ (e)=> e.key === 'Enter' ? onSearchTerm() : null}
                        type='text'
                        placeholder="Buscar..."
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                onClick={onSearchTerm}
                                aria-label="toggle password visibility"
                                >
                                    <SearchOutlined />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </ListItem>


                {
                    isLoggedIn

                    ?
                <>
                {/* <ListItem button>
                    <ListItemIcon>
                        <AccountCircleOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Perfil'} />
                </ListItem> */}

                <ListItem button onClick={()=> navigateTo('/orders/history')}>
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Mis Ordenes'} />
                </ListItem>

                </>
                :

                ''
                
                }




                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={()=> navigateTo('/category/keycaps')}>
                    <ListItemIcon>
                        <KeyboardCapslockOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Keycaps'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={()=> navigateTo('/category/keyboards')}>
                    <ListItemIcon>
                        <KeyboardAltOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Keyboards'} />
                </ListItem>

                <ListItem button sx={{ display: { xs: '', sm: 'none' } }} onClick={()=> navigateTo('/category/tools')}>
                    <ListItemIcon>
                        <KeyboardOptionKeyOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Tools'} />
                </ListItem>


                {
                    isLoggedIn
                    ?

                    <ListItem button onClick={logout}>
                    <ListItemIcon>
                        <LoginOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Salir'} />
                    </ListItem>

                    :
                    
                    
                    <ListItem button onClick={()=> navigateTo(`/auth/login`)}>
                        {/* ?p=${ router.asPath } */}
                        <ListItemIcon>
                            <VpnKeyOutlined/>
                        </ListItemIcon>
                        <ListItemText primary={'Ingresar'} />
                    </ListItem>
                
                }


                {/* Admin */}


            {     
            
            user?.role === 'admin' && (
                <>
                <Divider />
                <ListSubheader>Admin Panel</ListSubheader>

                <ListItem 
                    button
                    onClick={()=> navigateTo(`/admin`)}
                    >
                    <ListItemIcon>
                        <DashboardCustomizeOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Dashboard'} />
                </ListItem>
                <ListItem 
                
                button
                onClick={()=> navigateTo(`/admin/products`)}
                >
                    <ListItemIcon>
                        <CategoryOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Productos'} />
                </ListItem>
                <ListItem 
                button
                onClick={()=> navigateTo(`/admin/orders`)}
                >
                    <ListItemIcon>
                        <ConfirmationNumberOutlined/>
                    </ListItemIcon>
                    <ListItemText primary={'Ordenes'} />
                </ListItem>

                <ListItem 
                button
                onClick={()=> navigateTo(`/admin/users`)}
                >
                    <ListItemIcon>
                        <AdminPanelSettings/>
                    </ListItemIcon>
                    <ListItemText primary={'Usuarios'} />
                </ListItem>
                </>
            )
            }

            </List>
        </Box>
    </Drawer>
  )
}
