import { PeopleOutlineOutlined } from '@mui/icons-material'
import React from 'react'
import { AdminLayout } from '../../components/layouts'
import { DataGrid, GridColDef, GridValueGetterParams} from '@mui/x-data-grid';
import { Grid } from '@mui/material';
import useSWR from 'swr';
import { IUser } from '../../interface';

const UsersPage = () => {

    const { data, error} = useSWR<IUser[]>('/api/admin/user')


    if(!data && !error) return <></>

    const columns: GridColDef[]= [
        { field: 'email', headerName: 'Email', width: 250},
        { field: 'name', headerName: 'Nombre completo', width: 300},
        { field: 'role', headerName: 'Rol', width: 300}
    ]

    const rows = data!.map((user) => ({
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