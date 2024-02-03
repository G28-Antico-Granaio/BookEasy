import { connect_DB } from "@/app/config/db-config";
import Review from "@/app/models/review_model";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/reviews/review/{reservation_id}:
 *   post:
 *     summary: Publica una recensione
 *     description: Publica una recensione sulla recensione che corrisponde al parametro reservation_id passato
 *     tags:
 *       - Review
 *     parameters:
 *       - in: path
 *         name: reservation_id
 *         required: true
 *         description: Il parametro _id della prenotazione su di cui è la recensione
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dati Recensione
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               table_id:
 *                  type: number
 *               date:
 *                  type: string
 *                  format: date
 *               turn:
 *                  type: number
 *               cover_number:
 *                  type: number
 *               status:
 *                  type: boolean
 *               email:
 *                  type: string
 *               name:
 *                  type: string
 *               surname:
 *                  type: string
 *               comment:
 *                  type:string
 *     responses:
 *       201:
 *         description: Created. Prenotazione effetuata
 *       409:
 *         description: Conflict.Recensione è già stata effettuata
 *       500:
 *         description: Internal Server Error. Si è verificato un errore durante la publicazione della recensione
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