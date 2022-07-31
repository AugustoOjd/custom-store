import { AlarmOutlined, DeliveryDiningOutlined, EmailOutlined, FacebookOutlined, ListAltOutlined, MapOutlined, QuestionAnswerOutlined, Twitter, YouTube } from '@mui/icons-material'
import { Box, Button, Grid, Paper, Stack} from '@mui/material'
import React from 'react'

export const Footer = () => {
  return (
        <Grid container spacing={4} sx={{ padding: '15px 30px'}}>
            <Grid item xs={12} md={4}>
                <Paper elevation={1} sx={{ width: '100%', padding: 1 }}>
                    <Stack spacing={2} direction='column'>
                        <Button
                            variant="text" 
                            color='secondary'
                            size="medium"
                            >
                                <Twitter/>
                                Twitter
                            </Button>
                            <Button
                            variant="text" 
                            color='secondary'
                            size="medium"
                            >
                                <YouTube/>
                                Youtube
                            </Button>
                            <Button
                            variant="text" 
                            color='secondary'
                            size="medium"
                            >
                                <FacebookOutlined/>
                                Facebook
                            </Button>
                    </Stack>
                </Paper>

            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={1} sx={{ width: '100%', padding: 1 }}>
                    <Stack spacing={2} direction='column'>
                        <Button
                            variant="text" 
                            color='secondary'
                            size="medium"
                            >
                                <AlarmOutlined/>
                                Promociones
                            </Button>
                            <Button
                            variant="text" 
                            color='secondary'
                            size="medium"
                            >
                                <DeliveryDiningOutlined/>
                                Envios especiales
                            </Button>
                            <Button
                            variant="text" 
                            color='secondary'
                            size="medium"
                            >
                                <QuestionAnswerOutlined/>
                                Preguntas frecuentes
                            </Button>
                    </Stack>
                </Paper>

            </Grid>
            <Grid item xs={12} md={4}>
                <Paper elevation={1} sx={{ width: '100%', padding: 1 }}>
                    <Stack spacing={2} direction='column'>
                        <Button
                            variant="text" 
                            color='secondary'
                            size="medium"
                            >
                                <MapOutlined/>
                                Ubicaciones
                            </Button>
                            <Button
                            variant="text" 
                            color='secondary'
                            size="medium"
                            >
                                <EmailOutlined/>
                                Contacto
                            </Button>
                            <Button
                            variant="text" 
                            color='secondary'
                            size="medium"
                            >
                                <ListAltOutlined/>
                                Terminos y condiciones
                            </Button>
                    </Stack>
                </Paper>

            </Grid>
        </Grid>
  )
}

