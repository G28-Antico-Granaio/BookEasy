import { connect_DB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "@/app/helpers/validateJWT";
import User from "@/app/models/user_model";

//connect to databease
connect_DB();

//api
export async function GET(req: NextRequest) {
    try {
        //validateJWT
        const user_id = await validateJWT(req);

        //get the data from the DB
        const user = await User.findById(user_id).select({/*"-password"*/});

        //return success
        return NextResponse.json({
            data: user,
        },
            {
                status: 200
            }
        );    
    } catch (error: any) {
        //error message
        console.log("ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/current_user'\n");

        //return error
        return NextResponse.json({
            message: error.message
        },
            {
                status: 400
            }        
        );
    }
} 