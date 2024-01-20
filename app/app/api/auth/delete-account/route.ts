import { connect_DB } from "@/configs/dbConfig";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

//connect to the database
connect_DB();

//api
export async function POST(req: NextRequest) {
    try {
        //get current user
        const current_user = await fetch('http://localhost:3000/api/cuttent-user');
        const user = await current_user.json();

        //get password from form
        const req_body = await req.json();
        
        //compare passwords
        const password_match = await bcrypt.compare(req_body.password, user.password);
        
        //handle wrong password
        if(!password_match) {
            throw new Error("ERRORE: Credenziali inserite non valide");
        }

        //logout to delete token
        await fetch('http://localhost:3000/api/logout');

        //delete user
        await User.findOneAndDelete({ email: user.email });

        //return success
        return NextResponse.json({
            message: "Eliminazione account Effettuata",
        },
            {
                status: 200
            }
        );

    } catch(error: any) {
        //error message
        console.log("ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/delete-account'\n");

        //return error
        return NextResponse.json({
            message: error.message,
        },
            {
                status: 400
            }
        );
    }
}