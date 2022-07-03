import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { lightTheme } from '../themes'
import { SWRConfig } from 'swr'
import { UiProvider } from '../context/ui'
import { CartProvider } from '../context'

function MyApp({ Component, pageProps }: AppProps) {
  return( 
    <SWRConfig 
    value={{
      fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
    }}
  >
    <CartProvider>
    <UiProvider>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline/>
        <Component {...pageProps} />
      </ThemeProvider>
    </UiProvider>
      {/* <Dashboard /> */}


    </CartProvider>
    
    </SWRConfig>

  )
}

export default MyApp
