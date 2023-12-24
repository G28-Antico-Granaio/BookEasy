import { NextResponse } from "next/server";

export async function GET() {
    
    const res = NextResponse.json({
        message: "Logout Effettuato",
    });

    res.cookies.delete("token");
    return res; 
}