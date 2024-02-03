import { connect_DB } from "@/app/config/db-config";
import Reservation from "@/app/models/reservation_model";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/reservations/old-reservation/{email}:
 *   get:
 *     summary: Prende le prenotazioni passate degli ultimi 7 giorni di un utente
 *     description: Restituisce tutte le prenotazioni passate degli ultimi 7 giorni dell'utente che corrisponde alla email passata
 *     tags:
 *       - Reservation
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: Indirizzo e-mail dell'utente di cui devono essere restituite le prenotazioni
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK. Prenotazioni trovate/Non ci sono prenotazioni
 *       500:
 *         description: Internal Server Error. Si è verificato un errore durante la raccolta delle prenotazioni
 */


interface Params {
    email: string;
}

connect_DB();

export async function GET(req: NextRequest, {params}: {params: Params}) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const sevenDaysAgo = new Date(today);
        sevenDaysAgo.setDate(today.getDate() - 8);

        const data = await Reservation.find({ 
            email: params.email,
            date: { $gte: sevenDaysAgo, $lt: today },
        });

        let message = "Prenotazioni trovate";
        if (!data || data.length === 0) {
            message = "Non ci sono prenotazioni";
        }

        return NextResponse.json({
            success: true,
            message: message,
            data: data,
        }, {
            status: 200,
        })        
    } catch (error: any) {
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/reservations/old-reservation/[email]' --> ", error.message);

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la raccolta delle prenotazioni",
        }, {
            status: error.status || 500,
        });
    }
}