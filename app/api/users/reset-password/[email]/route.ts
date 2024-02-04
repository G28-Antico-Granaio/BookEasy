import { connect_DB } from "../../../../config/db-config";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /api/users/reset-password/{email}:
 *   patch:
 *     summary: Ripristina la password
 *     description: Ripristina la password dell'utente che corrisponde all'email passata
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dati ripristino password
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK. Password modificata
 *       401:
 *         description: Forbidden. Password vecchia e nuova corrispondono
 *       404:
 *         description: Not Found. Utente non trovato
 *       500:
 *         description: Internal Server Error. Si è verificato un errore durante il reset della password
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
      throw new my_error("Password vecchia e nuova corrispondono", 403);
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
      status: 200
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
