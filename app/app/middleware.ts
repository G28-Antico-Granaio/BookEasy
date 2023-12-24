import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    
    console.log("middleware executed: " + req.nextUrl.pathname);
     
    let is_public_route = false;
    if (req.nextUrl.pathname === '/login' ||
        req.nextUrl.pathname == '/register' ||
        req.nextUrl.pathname == '/password-recovery' ||
        req.nextUrl.pathname == '/reset-password' ||
        req.nextUrl.pathname == '/'){

        is_public_route = true;
    }

    const token = req.cookies.get("token")?.value || "";
    if (!token && !is_public_route) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (token && is_public_route) {
        return NextResponse.redirect(new URL('/', req.url));
    }

    return NextResponse.next();
}

//public pages
export const config = {
    matcher: [
        '/login',
        '/register',
        '/password-recovery', 
        '/reset-password',
        '/'
    ]
}