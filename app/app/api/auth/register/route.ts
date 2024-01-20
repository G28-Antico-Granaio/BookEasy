import { connect_DB } from "@/configs/dbConfig";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

//connect to database
connect_DB();

//api
export async function POST(req :NextRequest) {
    try {
        //get form data
        const req_body = await req.json();

        //check if user exist
        const user_exist = await User.findOne({ email: req_body.email });

        //handle non existing user
        if (user_exist) {
            throw new Error("ERRORE: Esiste già un utente registrato con questo indirizzo e-mail");
        }

        //generate salt
        const salt = await bcrypt.genSalt(10);

        //hash form password
        const hashed_password = await bcrypt.hash(req_body.password, salt);
        req_body.password = hashed_password;

        //create new user
        const new_user = new User(req_body);

        //save new user
        await new_user.save();

        //return success
        return NextResponse.json({
            message: "Utente Creato",
            data: new_user,
        },
            {
                status: 200
            }
        );

    } catch (error: any) {
        //error message
        console.log("ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/register'\n");

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