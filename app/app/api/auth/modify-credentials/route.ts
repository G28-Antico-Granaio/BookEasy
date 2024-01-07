import { connect_DB } from "@/configs/dbConfig";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";

connect_DB();

export async function POST(req :NextRequest) {

    try {
        const req_body = await req.json();

        const user = await User.findOneAndUpdate({ req_body });

    } catch(error: any) {

        console.log("login api nope", error);
        return NextResponse.json({
            message: error.message,
        },
            {
                status: 400
            }
        );
    }
}