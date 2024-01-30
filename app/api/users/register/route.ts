import { connect_DB } from "../../../config/db-config";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: User Registration
 *     description: Handles user registration and password hashing.
 *     tags:
 *       - User
 *     requestBody:
 *       description: User registration data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               tel_number:
 *                 type: number
 *               tel_area_code:
 *                 type: number
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: OK. User successfully registered.
 *       409:
 *         description: Conflict. User already exists.
 *       500:
 *         description: Internal Server Error. An error occurred during user registration.
 */


class my_error extends Error {
    status: number;
    constructor(text: string, status: number) {
      super(text);
      this.status = status;
    }
} 

connect_DB();

export async function POST(req: NextRequest) {
    try {
        const req_body = await req.json();

        const user_exist = await User.findOne({ email: req_body.email });
        if (user_exist) {
            throw new my_error("(!!) Esiste già un utente registrato con questo indirizzo e-mail", 409);
        }

        const salt = await bcrypt.genSalt(10);

        const hashed_password = await bcrypt.hash(req_body.password, salt);
        req_body.password = hashed_password;

        const new_user = new User(req_body);

        await new_user.save();

        return NextResponse.json({
            success: true,
            message: "Utente Creato",
        }, {
            status: 201
        });
    } catch (error: any) {
        console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/register' --> ", error.message);

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la registrazione dell'utente",
        }, {
            status: error.status || 500
        });
    }
}
