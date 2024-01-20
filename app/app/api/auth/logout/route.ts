import { NextResponse } from "next/server";

//api
export async function GET() {
    try {
        //success
        const res = NextResponse.json({
            message: "Logout Effettuato",
        },
            {
                status: 200
            }
        );     
        
        //delete token
        res.cookies.delete("token");

        //return success
        return res; 

    } catch(error: any) {
        //error message
        console.log("ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/logout'\n");
        
        //return message
        return NextResponse.json({
            message: error.message,
        },
            {
                status: 400
            }
        );
    }
}