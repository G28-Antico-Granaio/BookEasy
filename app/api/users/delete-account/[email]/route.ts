import { connect_DB } from "../../../../config/db-config";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /api/users/delete-account/{email}:
 *   post:
 *     summary: Cancella l'account di un utente
 *     description: Cancella l'account dell'utente che corrisponde al parametro email passato se corrisponde il parametro password con quello all'interno del DataBase
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: L'indirizzo E-Mail dell'utente il cui account deve essere cancellato
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dati cancellazione utente
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: La password dell'utente
 *     responses:
 *       200:
 *         description: OK. Account Eliminato
 *       404:
 *         description: Not Found. Utente non trovato
 *       401:
 *         description: Unauthorized. Credenziali inserite non valide
 *       500:
 *         description: Internal Server Error. Si è verificato un errore durante la cancellazione dell'account
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

export async function POST(req: NextRequest, { params }: { params: Params }) {
    try {
        const req_body = await req.json();

        const user = await User.findOne({ email: params.email });
        if (!user) {
            throw new my_error("Utente non trovato", 404);
        }
        
        const password_match = await bcrypt.compare(req_body.password, user.password);
        if (!password_match) {
            throw new my_error("Credenziali inserite non valide", 401);
        }

        await User.findOneAndDelete({ email: user.email });

        return NextResponse.json({
            success: true,
            message: "Account Eliminato",
        }, {
            status: 200
        });

    } catch (error: any) {
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/users/delete-account7[email]' --> ", error.message);

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la cancellazione dell'account",
        },{
            status: error.status || 500
        });
    }
}