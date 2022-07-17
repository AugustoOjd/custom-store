import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// import { isValidToken } from "../../utils/jwt";
import { jwtVerify } from "jose"
import { getToken } from 'next-auth/jwt'


export async function middleware( req:NextRequest, ev:NextFetchEvent){


    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })


    let url= req.nextUrl.clone();
    url.basePath = '/auth/login?p=';
    url.pathname = req.page.name!;


    if ( !session ) {
        // const requestedPage = req.page.name;
        return NextResponse.redirect(url);
    }

    return NextResponse.next()

    // const {token = ''} = req.cookies

    // let url= req.nextUrl.clone();
    // url.basePath = '/auth/login?p=';
    // url.pathname = req.page.name!;

    // try {
    //     await jwtVerify( token, new TextEncoder().encode(process.env.JWT_SECRET_SEED ))
    //     // .enconde(process.env.JWT_SECRET_SEED)
    //     return NextResponse.next()

    // } catch (error) {
    //     return NextResponse.redirect(url);
    // }
}