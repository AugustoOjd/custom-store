import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// import { isValidToken } from "../../utils/jwt";
import { getToken } from 'next-auth/jwt'


export async function middleware( req:NextRequest, ev:NextFetchEvent){


    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })


    let url= req.nextUrl.clone();
    url.basePath = '/auth/login?p=';
    url.pathname = req.page.name!;


    if ( !session ) {
        // const requestedPage = req.page.name;
        return NextResponse.redirect(url);
    }


    const validRole = ['admin']

    if( !validRole.includes( session.user.role )){
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next()

}