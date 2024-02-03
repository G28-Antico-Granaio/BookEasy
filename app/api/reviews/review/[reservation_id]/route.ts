import { connect_DB } from "@/app/config/db-config";
import Review from "@/app/models/review_model";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/reviews/review/{reservation_id}:
 *   post:
 *     summary: Pubblica una recensione per una prenotazione specifica
 *     description: Pubblica una recensione per una prenotazione specifica se non esiste già una recensione per quella prenotazione
 *     tags:
 *       - Review
 *     parameters:
 *       - in: path
 *         name: reservation_id
 *         required: true
 *         description: _id della prenotazione per la quale si vuole pubblicare una recensione
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dati della recensione
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reservation_id:
 *                 type: string
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: "yyyy-MM-dd"
 *               location:
 *                 type: integer
 *               menu:
 *                 type: integer
 *               service:
 *                 type: integer
 *               bill:
 *                 type: integer
 *               comment:
 *                 type: string
 *     responses:
 *       201:
 *         description: Creata. Recensione pubblicata con successo
 *       409:
 *         description: Conflitto. Recensione già effettuata per la prenotazione specificata
 *       500:
 *         description: Errore interno del server. Si è verificato un errore durante la pubblicazione della recensione
 */



interface Params {
    reservation_id: string;
}

class my_error extends Error {
    status: number;
    constructor(text: string, status: number) {
      super(text);
      this.status = status;
    }
} 

connect_DB();

export async function POST(req: NextRequest, { params }: { params: Params}) {
    try {
        const review_exist = await Review.findOne({ reservaion_id: params.reservation_id });

        if (!review_exist) {
            const req_body = await req.json();

            const new_review = new Review(req_body);

            await new_review.save()

            return NextResponse.json({
                success: true,
                message: "Recensione publicata"
            }, {
                status: 201,
            })
        } else {
            throw new my_error("Recensione è già stata effettuata", 409);
        } 
    } catch (error: any) {
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/reviews/review/[reservation_id]' --> ", error.message)

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la publicazione della recensione",
            }, {
                status: error.status || 500
            }
        )
    }
}