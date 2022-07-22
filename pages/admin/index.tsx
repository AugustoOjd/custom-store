import { DashboardOutlined, CreditCardOffOutlined, AttachMoney, GroupOutlined, CancelPresentationOutlined, ProductionQuantityLimits, AccessTimeOutlined } from '@mui/icons-material';
import { Grid, CardContent, Typography, Card } from '@mui/material';
import React from 'react'
import { SummaryTile } from '../../components/admin';
import { AdminLayout } from '../../components/layouts/AdminLayout';

const DashboardPage = () => {
  return (
    <AdminLayout
        title='Dasboard'
        subTitle='Estadisticas'
        icon={<DashboardOutlined/>}
    >
        <h3>Admin page</h3>


        <Grid container spacing={2}>
            
<SummaryTile 
                title={1}
                subTitle={'Ordenes totales'}
                icon={<CreditCardOffOutlined color={'secondary'} sx={{fontSize: 40}} />}
            />

<SummaryTile 
                title={2}
                subTitle={'Ordenes pagadas'}
                icon={<AttachMoney color={'secondary'} sx={{fontSize: 40}} />}
            />

<SummaryTile 
                title={3}
                subTitle={'Ordenes sin pagar'}
                icon={<CreditCardOffOutlined color={'error'} sx={{fontSize: 40}} />}
            />

<SummaryTile 
                title={4}
                subTitle={'Clientes'}
                icon={<GroupOutlined color={'secondary'} sx={{fontSize: 40}} />}
            />

<SummaryTile 
                title={5}
                subTitle={'Productos'}
                icon={<CreditCardOffOutlined color={'warning'} sx={{fontSize: 40}} />}
            />

<SummaryTile 
                title={6}
                subTitle={'sin Existencia'}
                icon={<CancelPresentationOutlined color={'error'} sx={{fontSize: 40}} />}
            />

<SummaryTile 
                title={7}
                subTitle={'Poco Stock'}
                icon={<ProductionQuantityLimits color={'warning'} sx={{fontSize: 40}} />}
            />

<SummaryTile 
                title={8}
                subTitle={'Se actualiza en:'}
                icon={<AccessTimeOutlined color={'secondary'} sx={{fontSize: 40}} />}
            />
            

        </Grid>

    </AdminLayout>


    
  )
}

export default DashboardPage