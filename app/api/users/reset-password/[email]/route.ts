import { connect_DB } from "../../../../config/db-config";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /api/reset-password/{email}:
 *   put:
 *     summary: Reset user password
 *     description: Resets user password based on the provided email.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User password reset data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: OK. User password reset successfully.
 *       404:
 *         description: Bad Request. User not found during password update or old and new passwords are the same.
 *       404:
 *         description: Not Found. User not found.
 *       500:
 *         description: Internal Server Error. An error occurred while resetting the user password.rd
 */

interface Params {
  email: string;
}

class my_error extends Error {
  status: number;
  constructor(text: string, status: number) {
    super(text);
    this.status = status;
  }
} 

connect_DB();

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const req_body = await req.json();

    const response = await fetch(`http://localhost:3000/api/user/${params.email}`);
    if (!response.ok) {
      throw new my_error("(!!) Utente non trovato", 404);
    }

    const user = await response.json();

    const is_password_different = await bcrypt.compare(req_body.password, user.data.password);
    
    if (is_password_different) {
      throw new my_error("(!!) Password vecchia e nuova corrispondono", 409);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(req_body.password, salt);
    req_body.password = hashed_password;

    const updated_user = await User.findOneAndUpdate(
      { email: params.email },
      req_body,
      { new: true }
    );
    if (!updated_user) {
      throw new my_error("(!!) Utente non trovato durante l'aggiornamento della password", 400);
    }

    return NextResponse.json({
      success: true,
      message: "Password modificata",
    }, {
      status: 201
    });
  } catch (error: any) {
    console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/reset-password/[email]' --> " + error.message);

    return NextResponse.json({
      success: false,
      message: error.message || "Si è verificato un errore durante il reset della password",
    }, {
      status: error.status || 500
    });
  }
}
