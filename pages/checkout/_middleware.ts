import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
// import { isValidToken } from "../../utils/jwt";
import { jwtVerify } from "jose"


export async function middleware( req:NextRequest, ev:NextFetchEvent){


    const {token = ''} = req.cookies

    let url= req.nextUrl.clone();
    url.basePath = '/auth/login?p=';
    url.pathname = req.page.name!;

    try {
        await jwtVerify( token, new TextEncoder().encode(process.env.JWT_SECRET_SEED ))
        // .enconde(process.env.JWT_SECRET_SEED)
        return NextResponse.next()

    } catch (error) {
        return NextResponse.redirect(url);
    }
}