import { connect_DB } from "@/app/config/db-config";
import Reservation from "@/app/models/reservation_model";
import { NextRequest, NextResponse } from "next/server";
/**
 * @swagger
 * /api/reservations/day-turn-reservation/{date}/{turn}:
 *   get:
 *     summary: Prende tutte le recensioni di una data e turno
 *     description: Restituisce tutte le prenotazioni per la data e turno che gli sono fornite
 *     tags:
 *       - Reservation
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         description: La data di cui si vogliono avere le prenotazoini
 *         schema:
 *           type: string
 *           format: date
 *       - in: path
 *         name: turn
 *         required: true
 *         description: Il turno di cui si vogliono avere le prenotazioni
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK. Prenotazioni trovate/Non ci sono Prenotazioni
 *       500:
 *         description: Internal Server Error. Si è verificato un errore durante la raccolta delle prenotazioni
 */


interface Params {
    date: Date;
    turn: number;
}

connect_DB();

export async function GET(req: NextRequest, {params} : {params: Params}) {
    try {
        const data = await Reservation.find({ 
            turn: params.turn,
            date: params.date,
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
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/reservations/day-turn-reservation/[date]/[turn]' --> ", error.message);

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la raccolta delle prenotazioni",
        }, {
            status: error.status || 500,
        });
    }
}