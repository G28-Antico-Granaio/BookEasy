import { connect_DB } from "@/app/config/db-config";
import { NextRequest, NextResponse } from "next/server";
import Reservation from "@/app/models/reservation_model";

/**
 * @swagger
 * /api/reservation/delete-reservation:
 *   delete:
 *     summary: Delete reservation
 *     description: Deletes a reservation based on the provided parameters.
 *     tags:
 *       - Reservation
 *     requestBody:
 *       description: Reservation deletion data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the reservation to be deleted.
 *               date:
 *                 type: string
 *                 description: The date of the reservation.
 *               turn:
 *                 type: string
 *                 description: The turn of the reservation.
 *     responses:
 *       200:
 *         description: OK. Reservation deletion successful.
 *       404:
 *         description: Not Found. Reservation not found.
 *       500:
 *         description: Internal Server Error. An error occurred during reservation deletion.
 */

interface Params {
    _id: string;
}

class my_error extends Error {
    status: number;
    constructor(text: string, status: number) {
      super(text);
      this.status = status;
    }
} 

connect_DB();

export async function DELETE(req: NextRequest, {params}: {params: Params}) {
    try {
        const result = await Reservation.findByIdAndDelete({ _id: params._id });

        if (!result) {
            throw new my_error("(!!) Non esiste nessuna prenotazione", 404);
        }

        return NextResponse.json({
            sccess: true,
            message: "Eliminazione prenotazione effettuata",
        }, {
            status: 200,
        });  
    } catch (error: any) {
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/reservation/delete-reservation' --> ", error.message)

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la cancellazione della prenotazione",
            }, {
                status: error.status || 500
            }
        )
    }
}