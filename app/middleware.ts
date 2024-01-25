import { NextRequest, NextResponse } from "next/server";

//middleware
export async function middleware(req: NextRequest) {
    //activation message
    console.log("- Eseguito il Middleware: " + req.nextUrl.pathname);

    //create variable
    let is_public_route = false;

    //whitelisted pages
    if (req.nextUrl.pathname === "/login" ||
        req.nextUrl.pathname === "/register" ||
        req.nextUrl.pathname === "/password-recovery" ||
        req.nextUrl.pathname === "/reset-password") {

        is_public_route = true;
    }

    //get token
    const token = req.cookies.get("token")?.value || "";

    //handle no token and not public route
    if (!token && !is_public_route) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}

// public pages
export const config = {
    matcher: [
        "/login",
        "/register",
        "/password-recovery",
        "/reset-password",
    ],
};
