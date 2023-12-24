import { connect_DB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import { validateJWT } from "@/app/helpers/validateJWT";
import User from "@/app/models/user_model";

connect_DB();

export async function GET(req: NextRequest) {
    
    try {
        const user_id = await validateJWT(req);

        const user = await User.findById(user_id).select("-password");
        return NextResponse.json({
            data: user,
        });
    } catch (error: any) {

        console.log("current_user api nope", error);
        return NextResponse.json({
            message: error.message
        },
            {
                status: 400
            }        
        );
    }
} 