import { PeopleOutlineOutlined } from '@mui/icons-material'
import React, {useEffect, useState} from 'react'
import { AdminLayout } from '../../components/layouts'
import { DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import { Grid, MenuItem, Select } from '@mui/material';
import useSWR from 'swr';
import { IUser } from '../../interface';
import { storeApi } from '../../api';


const UsersPage = () => {

    const { data, error} = useSWR<IUser[]>('/api/admin/user')

    const [users, setUsers] = useState<IUser[]>([])

    useEffect(() => {

        if(data){
            setUsers(data)
        }
    

    }, [data])
    


    if(!data && !error) return <></>

    const onRoleUpdate = async (userId: string, newRole: string)=>{

        const prevUsers = users.map(user => ({...user}))

        const updateUsers = users.map( user => ({
            ...user,
            role: userId === user._id ? newRole : user.role
        }))

        setUsers(updateUsers)

        try {
            
            await storeApi.put('/admin/user', { userId, role: newRole})
        } catch (error) {
            setUsers(prevUsers)
            console.log(error)
        }
    }

    const columns: GridColDef[]= [
        { field: 'email', headerName: 'Email', width: 250},
        { field: 'name', headerName: 'Nombre', width: 300},
        { 
            field: 'role', 
            headerName: 'Rol', 
            width: 300,
            renderCell: ({row}: GridValueGetterParams) =>{
                return (
                    <Select
                        value={row.role}
                        label={'Role'}
                        sx={{ width: '300px'}}
                        onChange={ ({target})=> onRoleUpdate( row.id, target.value )}
                    >
                        <MenuItem value='admin'>Admin</MenuItem>
                        <MenuItem value='client'>Client</MenuItem>
                    </Select>
                )
            }
        }
    ]

    const rows = users.map((user) => ({
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
    }))


  return (
    <AdminLayout title='Usuarios' subTitle='Administracion de usuarios' icon={<PeopleOutlineOutlined/>}>


            <Grid container className='fadeIn'>
                <Grid item xs={12} sx={{ height: 650, width: '100%'}}>
                    <DataGrid 
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        rowsPerPageOptions={[10]}
                    />
                    
                </Grid>
            </Grid>



    </AdminLayout>
  )
}

export default UsersPage