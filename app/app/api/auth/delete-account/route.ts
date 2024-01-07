import { connect_DB } from "@/configs/dbConfig";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect_DB();

export async function POST(req :NextRequest) {

    try {
        
        const req_body = await req.json();

        const user = await User.findOneAndDelete({ email: req_body.email });

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