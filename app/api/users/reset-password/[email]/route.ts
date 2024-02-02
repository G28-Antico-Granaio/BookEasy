import { connect_DB } from "../../../../config/db-config";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /api/users/reset-password/{email}:
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

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
  try {
    const req_body = await req.json();

    const user = await User.findOne({ email: params.email});
    if (!user) {
      throw new my_error("Utente non trovato", 404);
    }

    const is_password_different = await bcrypt.compare(req_body.password, user.password);
    
    if (is_password_different) {
      throw new my_error("Password vecchia e nuova corrispondono", 409);
    }

    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(req_body.password, salt);
    req_body.password = hashed_password;

    await User.findOneAndUpdate(
      { email: params.email },
      req_body,
      { new: true }
    );

    return NextResponse.json({
      success: true,
      message: "Password modificata",
    }, {
      status: 201
    });
  } catch (error: any) {
    console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/reset-password/[email]' --> " + error.message);

    return NextResponse.json({
      success: false,
      message: error.message || "Si è verificato un errore durante il reset della password",
    }, {
      status: error.status || 500
    });
  }
}
