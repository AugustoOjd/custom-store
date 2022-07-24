import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// import { isValidToken } from "../../utils/jwt";
import { jwtVerify } from "jose"
import { getToken } from 'next-auth/jwt'
import { useRouter } from 'next/router';


export async function middleware( req:NextRequest, ev:NextFetchEvent){


    const session: any = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })


    if ( !session ) {
        // const requestedPage = req.page.name;
        return new Response( JSON.stringify({ message: 'No autorizado'}),
            {
                status: 401,
                headers: {
                    'Content-Type':'application/json'
                }
            }
        )
    }


    const validRole = ['admin']

    if( !validRole.includes( session.user.role )){
        return new Response( JSON.stringify({ message: 'No autorizado'}),
            {
                status: 401,
                headers: {
                    'Content-Type':'application/json'
                }
            }
        )
    }

    return NextResponse.next()

}