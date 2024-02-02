import { connect_DB } from "@/app/config/db-config";
import Reservation from "@/app/models/reservation_model";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/reservations/get-all-reservation/{email}:
 *   get:
 *     summary: Get all reservations for a user
 *     description: Retrieves all reservations associated with the provided email.
 *     tags:
 *       - Reservation
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email of the user whose reservations need to be retrieved.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK. Reservations retrieved successfully.
 *       500:
 *         description: Internal Server Error. An error occurred during the retrieval of reservations.
 */


interface Params {
    email: string;
}

connect_DB();

export async function GET(req: NextRequest, {params}: {params: Params}) {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const data = await Reservation.find({ 
            email: params.email,
            date: { $gte: today },
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
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/reservations/new-reservation/[email]' --> ", error.message);

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la raccolta delle prenotazioni",
        }, {
            status: error.status || 500,
        });
    }
}