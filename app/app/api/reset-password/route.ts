import { connect_DB } from "@/configs/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

//connect to  database
connect_DB();

//api
export async function POST(req: NextRequest) {
  try {
    //get current user
    const current_user = await fetch('http://localhost:3000/api/cuttent-user');
    const user = await current_user.json();

    //get form data
    const req_body = await req.json();
    const { current_password, new_password } = req_body;

    // Verify the current password
    const is_password_valid = await bcrypt.compare(current_password, user.password);
    if (!is_password_valid) {
      throw new Error("ERRORE: la nuova password deve essere diversa da quella vecchia");
    }

    //hash and update the new password
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(new_password, salt);
    user.password = hashed_password;

    //save updated user
    await user.save();

    //return success
    return NextResponse.json({
      message: "Password Modificate",
      data: user,
    },
      {
        status: 200
      }
    );
  } catch (error: any) {
    //error message
    console.error("ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/reset-password'\n");

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
