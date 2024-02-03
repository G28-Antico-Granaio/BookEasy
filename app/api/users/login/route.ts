import { connect_DB } from "../../../config/db-config";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login
 *     description: Autentica un utente con i parametri passati
 *     tags:
 *       - User
 *     requestBody:
 *       description: Dati login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: L'indirizzo e-mail dell'utente
 *               password:
 *                 type: string
 *                 description: La password dell'utente
 *     responses:
 *       201:
 *         description: OK. Login effettuato
 *       404:
 *         description: Not Found. E-mail e/o password errate
 *       401:
 *         description: Unauthorized. E-mail e/o password errate
 *       500:
 *         description: Internal Server Error. Login effettuato
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

        const user = await User.findOne({ email: req_body.email });
        if (!user) {
            throw new my_error("E-mail e/o password errate", 404);
        }

        const password_match = await bcrypt.compare(req_body.password, user.password);
        if (!password_match) {
            throw new my_error("E-mail e/o password errate", 401);
        }

        return NextResponse.json({
            success: true,
            message: "Login effettuato",
            data: {
                isAdmin: user.isAdmin,
            },
        }, {
            status: 201
        });
    } catch (error: any) {
        console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/users/login' --> ", error.message);

        return NextResponse.json({
            success: false,
            message: error.message || "Login effettuato",
        }, {
            status: error.status || 500
        });
    }
}
