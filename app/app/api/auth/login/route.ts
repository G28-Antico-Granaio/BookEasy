import { connect_DB } from "@/configs/dbConfig";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect_DB();

export async function POST(req :NextRequest) {

    try {
        const req_body = await req.json();

        const user = await User.findOne({ email: req_body.email });
        if (!user) {
            throw new Error("non esiste un utente registrato con questo indirizzo e-mail");
        }

        const password_match = await bcrypt.compare(req_body.password, user.password);

        if(!password_match) {
            throw new Error("Credenziali non valide");
        }

        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

        const res = NextResponse.json({ message: "Login Effettuato", })
        res.cookies.set("token", token, {
            httpOnly: true,
            path: '/',
        });

        return res;

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