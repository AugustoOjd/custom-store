import { DashboardOutlined, CreditCardOffOutlined, AttachMoney, GroupOutlined, CancelPresentationOutlined, ProductionQuantityLimits, AccessTimeOutlined, ProductionQuantityLimitsOutlined } from '@mui/icons-material';
import { Grid, CardContent, Typography, Card } from '@mui/material';
import React, {useState, useEffect} from 'react'
import useSWR from 'swr';
import { clearInterval, setInterval} from 'timers';
import { SummaryTile } from '../../components/admin';
import { AdminLayout } from '../../components/layouts/AdminLayout';
import { DashboardSummaryResponse } from '../../interface';




const DashboardPage = () => {


    const { data, error } = useSWR<DashboardSummaryResponse>('/api/admin/dashboard', {
        refreshInterval: 30 * 1000
    })

    const [refreshIn, setRefreshIn] = useState(30)

    useEffect(() => {
      const interval = setInterval(()=> {
        setRefreshIn( refreshIn => refreshIn > 0 ? refreshIn -1 : 30)

      }, 1000)
        
        
      return () => clearInterval( interval )
        
      
    }, [])
    

    if(!error && !data){
        return <></>
    }

    if(error){
        console.log()
        return <Typography>Error al cargar la informacion</Typography>
    }

    const { 
        numberOfOrders,
        paidOrders,
        numberOfClients,
        numberOfProducts,
        productsWithNoInvetory,
        lowInventory,
        notPaidOrders,
    } = data!

  return (
    <AdminLayout
        title='Dasboard'
        subTitle='Estadisticas'
        icon={<DashboardOutlined/>}
    >
        <h3>Admin page</h3>


        <Grid container spacing={2}>
            
<SummaryTile 
                title={numberOfOrders}
                subTitle={'Ordenes totales'}
                icon={<CreditCardOffOutlined color={'secondary'} sx={{fontSize: 40}} />}
            />

<SummaryTile 
                title={paidOrders}
                subTitle={'Ordenes pagadas'}
                icon={<AttachMoney color={'secondary'} sx={{fontSize: 40}} />}
            />

<SummaryTile 
                title={notPaidOrders}
                subTitle={'Ordenes sin pagar'}
                icon={<CreditCardOffOutlined color={'error'} sx={{fontSize: 40}} />}
            />

<SummaryTile 
                title={numberOfClients}
                subTitle={'Clientes'}
                icon={<GroupOutlined color={'secondary'} sx={{fontSize: 40}} />}
            />

<SummaryTile 
                title={numberOfProducts}
                subTitle={'Productos'}
                icon={<DashboardOutlined color={'warning'} sx={{fontSize: 40}} />}
            />

<SummaryTile 
                title={productsWithNoInvetory}
                subTitle={'Sin Stock'}
                icon={<CancelPresentationOutlined color={'error'} sx={{fontSize: 40}} />}
            />

<SummaryTile 
                title={lowInventory}
                subTitle={'Poco Stock'}
                icon={<ProductionQuantityLimits color={'warning'} sx={{fontSize: 40}} />}
            />

<SummaryTile 
                title={refreshIn}
                subTitle={'Se actualiza en:'}
                icon={<AccessTimeOutlined color={'secondary'} sx={{fontSize: 40}} />}
            />
            

        </Grid>

    </AdminLayout>


    
  )
}

export default DashboardPage