import { connect_DB } from "@/app/config/db-config";
import Reservation from "@/app/models/reservation_model";
import { NextRequest, NextResponse } from "next/server";
/**
 * @swagger
 * /api/reservations/all-reservation/{date}/{turn}:
 *   get:
 *     summary: Get all reservations for a specific date and turn
 *     description: Retrieves all reservations for the provided date and turn.
 *     tags:
 *       - Reservation
 *     parameters:
 *       - in: query
 *         name: date
 *         required: true
 *         description: The date for which reservations need to be retrieved.
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: turn
 *         required: true
 *         description: The turn for which reservations need to be retrieved.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK. Reservations retrieved successfully.
 *       500:
 *         description: Internal Server Error. An error occurred during the retrieval of reservations.
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

        return NextResponse.json({
            success: true,
            data: data,
        }, {
            status: 200,
        }) 
    } catch (error: any) {
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/reservations/all-reservation/[date]/[turn]' --> ", error.message);

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la raccolta delle prenotazioni",
        }, {
            status: error.status || 500,
        });
    }
}