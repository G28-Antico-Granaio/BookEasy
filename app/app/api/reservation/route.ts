import { connect_DB } from "@/configs/dbConfig";
import Reservation from "@/app/models/reservation_model";
import { NextRequest, NextResponse } from "next/server";

connect_DB();

export async function POST(req: NextRequest) {

    try {
        const req_body = await req.json();

        const reservation_exist = await Reservation.findOne({ 
            table_id: req_body.table_id,
            date: req_body.date,
            turn: req_body.turn,
        })
        if (reservation_exist) {
            throw new Error("Il tavolo selezionato è già prenotato");
        }

        const new_reservation = new Reservation(req_body);

        await new_reservation.save();

        return NextResponse.json({
            message: "Prenotazione Effettuata",
            data: new_reservation,
        })

    } catch (error: any) {
        
        console.log("reservation api nope", error);

        return NextResponse.json({
            message: error.message,
        },
            {
                status: 400
            }
        );
    }    
} 