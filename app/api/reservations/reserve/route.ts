import { connect_DB } from "@/app/config/db-config";
import { NextRequest, NextResponse } from "next/server";
import Reservation from "@/app/models/reservation_model";
import moment from "moment";

/**
 * @swagger
 * /api/reservations/reserve:
 *   post:
 *     summary: Prenota un tavolo
 *     description: Prenota un tavolo con i parametri che gli sono passati
 *     tags:
 *       - Reservation
 *     requestBody:
 *       description: Dati prenotazione
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               table_id:
 *                 type: integer
 *               turn:
 *                 type: integer
 *               date:
 *                 type: string
 *                 format: "yyyy-MM-dd"
 *               cover_number:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: ["reserved", "unreserved"]
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created. Tavolo prenotato
 *       409:
 *         description: Conflict. Tavolo già prenotato
 *       500:
 *         description: Internal Server Error. Si è verificato un errore durante la prenotazione del tavolo
 */




class my_error extends Error {
    status: number;
    constructor(text: string, status: number) {
      super(text);
      this.status = status;
    }
}

connect_DB();

export async function POST(req: NextRequest) {
    try {
        const req_body = await req.json();

        const date = moment(req_body.date).format('YYYY-MM-DD');
        req_body.date = date;

        const exist_reservation = await Reservation.findOne({
            table_id: req_body.table_id,
            date: req_body.date,
            turn: req_body.turn
        });

        if (!exist_reservation) {
            const new_reservation = new Reservation(req_body);

            await new_reservation.save();

            return NextResponse.json({
                sccess: true,
                message: "Tavolo prenotato",
            }, {
                status: 201,
            });  
        } else {
            throw new my_error("Tavolo già prenotato", 409);
        }
    } catch (error: any) {
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/reservations/reserve' --> ", error.message)

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la prenotazione del tavolo",
            }, {
                status: error.status || 500
            }
        )
    }
}