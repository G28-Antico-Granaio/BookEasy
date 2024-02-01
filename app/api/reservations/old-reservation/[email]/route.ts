import { connect_DB } from "@/app/config/db-config";
import Reservation from "@/app/models/reservation_model";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/reservations/old-reservation/{email}:
 *   get:
 *     summary: Get old reservations for a user
 *     description: Retrieves reservations made by the user in the last 7 days.
 *     tags:
 *       - Reservation
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email of the user whose old reservations need to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK. Old reservations retrieved successfully.
 *       500:
 *         description: Internal Server Error. An error occurred during the retrieval of old reservations.
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

        return NextResponse.json({
            success: true,
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