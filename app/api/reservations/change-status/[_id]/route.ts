import { connect_DB } from "@/app/config/db-config";
import Reservation from "@/app/models/reservation_model";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/reservations/change-status/{_id}:
 *   patch:
 *     summary: Cambia lo stato della prenotazione
 *     description: Cambia lo stato alla prenotazione che corrisponde al reservation_id passato
 *     tags:
 *       - Reservation
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: Il campo _id della prenotazione di cui lo stato deve essere cambiato
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK. Stato del tavolo cambiato
 *       404:
 *         description: Not Found. Prenotazione non trovata
 *       500:
 *         description: Internal Server Error. Si è verificato un problema durante il cambiamento di stato
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
            message: "Stato tavolo cambiato"
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