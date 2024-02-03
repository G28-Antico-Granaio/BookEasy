import { connect_DB } from "../../../config/db-config";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Registrazione
 *     description: Crea un nuovo account con le credenialoi passate
 *     tags:
 *       - User
 *     requestBody:
 *       description: Dati registrazione
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
 *         description: OK. Utente creato
 *       409:
 *         description: Conflict. Indirizzo e-mail è già associato ad un account esistente/Numero di telefono è già associato ad un account esistente
 *       500:
 *         description: Internal Server Error. Si è verificato un errore durante la registrazione dell'utente
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
            throw new my_error("Indirizzo e-mail è già associato ad un account esistente", 409);
        }

        const used_tel_numb = await User.findOne({ tel_number: req_body.tel_number});
        if (used_tel_numb) {
            throw new my_error("Numero di telefono è già associato ad un account esistente", 409)
        }

        const salt = await bcrypt.genSalt(10);

        const hashed_password = await bcrypt.hash(req_body.password, salt);
        req_body.password = hashed_password;

        const new_user = new User(req_body);

        await new_user.save();

        return NextResponse.json({
            success: true,
            message: "Utente creato",
        }, {
            status: 201
        });
    } catch (error: any) {
        console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/users/register' --> ", error.message);

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la registrazione dell'utente",
        }, {
            status: error.status || 500
        });
    }
}
