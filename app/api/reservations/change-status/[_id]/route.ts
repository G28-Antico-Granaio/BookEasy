import { connect_DB } from "@/app/config/db-config";
import Reservation from "@/app/models/reservation_model";
import { NextRequest, NextResponse } from "next/server";

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

export async function PUT(req: NextRequest, { params }: { params: Params }) {
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
            message: "Cambio di stato effettuato",
        }, {
            status: 200,
        })        
    } catch (error: any) {
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/reservations/change-status/[_id]' --> ", error.message);

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un problema durante il cambiamento di stato"
        }, {
            status: error.status || 500,
        })
    }
}