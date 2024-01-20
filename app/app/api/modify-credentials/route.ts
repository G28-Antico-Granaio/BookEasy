import { connect_DB } from "@/configs/dbConfig";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";

//connect to  database
connect_DB();

//api
export async function POST(req: NextRequest) {
  try {
    //get form data
    const req_body = await req.json();

    //check if user exists
    const user = await User.findOne({ email: req_body.email });

    //handle non existing user
    if (!user) {
      throw new Error("ERRORE: Utente non trovato");
    }

    //save new data
    user.name = req_body.name
    user.surname = req_body.surname
    user.tel_number = req_body.tel_number
    user.tel_area_code = req_body.tel_area_code
    user.email = req_body.email

    //save updated user
    await user.update();

    //return success
    return NextResponse.json({
      message: "Credenziali Modificate",
      data: user,
    },
      {
        status: 200
      }
    );
  } catch (error: any) {
    //error message
    console.error("ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/modify-credentials'\n");

    //return error
    return NextResponse.json({
      message: error.message,
    },
      {
        status: 400,
      }
    );
  }
}