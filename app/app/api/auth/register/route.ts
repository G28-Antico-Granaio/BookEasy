import { connect_DB } from "@/configs/dbConfig";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect_DB();

export async function POST(req :NextRequest) {

    try {
        const req_body = await req.json();

        const user_exist = await User.findOne({ email: req_body.email });
        if (user_exist) {
            throw new Error("Esiste già un utente registrato con questo indirizzo e-mail");
        }

        const salt = await bcrypt.genSalt(10);

        const hashed_password = await bcrypt.hash(req_body.password, salt);
        req_body.password = hashed_password;
        const new_user = new User(req_body);

        await new_user.save();

        return NextResponse.json({
            message: "Utente Creato",
            data: new_user,
        })

    } catch (error: any) {
        
        console.log("register api nope")
        return NextResponse.json({
            message: error.message,
        },
            {
                status: 400
            }
        );
    }
}