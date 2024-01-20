import { connect_DB } from "@/configs/dbConfig";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//connect to databes
connect_DB();

//api
export async function POST(req :NextRequest) {
    try {
        //get data from form
        const req_body = await req.json();

        //check if user exist
        const user = await User.findOne({ email: req_body.email });

        //handle non existing user
        if (!user) {
            throw new Error("ERRORE: Non esiste un utente registrato con questo indirizzo e-mail");
        }

        //check if password is right
        const password_match = await bcrypt.compare(req_body.password, user.password);

        //handle wrong password
        if(!password_match) {
            throw new Error("ERRORE: Credenziali inserite non valide");
        }

        //generate token (1-userid 2-secret word 3-experatio date)
        const token = jwt.sign({id: user._id }, process.env.JWT_SECRET!, { expiresIn: "7d" });

        //success
        const res = NextResponse.json({
            message: "Login Effettuato",
        },
            {
                status: 200
            }
        );
        
        //set cookies
        res.cookies.set("token", token, {
            httpOnly: true,
            path: '/',
        });

        //return success
        return res;

    } catch (error: any) {
        //error message
        console.log("ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/login'\n");

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