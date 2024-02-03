import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user_model";
import { connect_DB } from "../../../../config/db-config";

/**
 * @swagger
 * /api/users/get-user/{email}:
 *   get:
 *     summary: Prende le informazioni dell'utente
 *     description:Restituisce le informazioni dell'utente a cui corrisponde il paraetro email passato
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: L'indirizzo e-mail dell'utente di cui si vogliono ottenere le informazioni
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK. Utente non trovato
 *       404:
 *         description: Not Found. User not found.
 *       500:
 *         description: Internal Server Error. Si è verificato un errore durante il recupero delle informazioni dell'utente
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

export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        const user = await User.findOne({ email: params.email });
        if (!user){
            throw new my_error("Utente non trovato", 404);
        }

        return NextResponse.json({
            success: true,
            message: "Utente trovato",
            data: user
        }, {
            status: 200
        });
    } catch (error: any) {
        console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/users/get-user/[email]' --> ", error.message);

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante il recupero delle informazioni dell'utente",
        }, {
            status: error.status || 500
        });
    }
}
