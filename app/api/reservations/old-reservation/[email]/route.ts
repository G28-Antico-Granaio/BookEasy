import { connect_DB } from "@/app/config/db-config";
import Reservation from "@/app/models/reservation_model";
import { NextRequest, NextResponse } from "next/server";

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

        let message: string = "Prenotazioni Caricate"
        if (!data || data.length === 0) {
            message = "Non ci sono prenotazioni"
        }

        return NextResponse.json({
            success: true,
            message: message,
            data: data,
        }, {
            status: 200,
        })        
    } catch (error: any) {
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/reservations/old-reservation' --> ", error.message);

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la raccolta delle prenotazioni",
        }, {
            status: error.status || 500,
        });
    }
}