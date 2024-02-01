import { connect_DB } from "@/app/config/db-config";
import Reservation from "@/app/models/reservation_model";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/reservations/change-status/{_id}:
 *   put:
 *     summary: Change reservation status
 *     description: Changes the status of a reservation based on the provided reservation ID.
 *     tags:
 *       - Reservation
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: The ID of the reservation whose status needs to be changed.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK. Reservation status changed successfully.
 *       404:
 *         description: Not Found. Reservation not found for the provided ID.
 *       500:
 *         description: Internal Server Error. An error occurred during the status change.
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

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
    try {
        const reservation = await Reservation.findById(params._id);
        if (!reservation) {
            throw new my_error("Prenotazione Non Trovata", 404);
        }

        const changed_reservation = await Reservation.findByIdAndUpdate(
            params._id,
            { $set: { status: !reservation.status } },
            { new: true }
        );
        if (!changed_reservation) {
            throw new my_error("Prenotazione Non Trovata", 404);
        }

        return NextResponse.json({
            success: true,
        }, {
            status: 200,
        })        
    } catch (error: any) {
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/reservations/change-status/[_id]' --> ", error.message);

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un problema durante il cambiamento di stato"
        }, {
            status: error.status || 500,
        })
    }
}