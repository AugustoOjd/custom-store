import { Box, Grid } from '@mui/material';
import Head from "next/head"
import React, { FC } from "react";
import { Navbar, SideMenu } from '../ui';
import { Footer } from '../ui/Footer';


interface Props {
    title: string;
    pageDescription: string,
    imageFullUrl?: string,
    children: React.ReactNode
}

export const ShopLayout:FC<Props> = ({children, title, pageDescription, imageFullUrl }) => {
  return (
    <>
        <Head>
            <title>{title}</title>
            <meta name="descrption" content={pageDescription}/>
            <meta name="og: title" content={title}/>
            <meta name="og: description" content={pageDescription}/>

            {
                imageFullUrl && (
                    <meta name="og: image" content={imageFullUrl} />
                )
            }
        </Head>

            <nav>
            <Navbar/>
            </nav>
            

            <SideMenu/>



        <main style={{ margin: '80px auto', minHeight: '1000px', maxWidth: '1440px', padding: '0px 30px'}}>
            {children}
        </main>

        <footer style={{ backgroundColor: '#f28f3b'}}>
            <Footer/>
        </footer>
    </>
  )
}
