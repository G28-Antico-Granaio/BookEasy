import { connect_DB } from "@/app/config/db-config";
import Review from "@/app/models/review_model";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/reviews/responde/{_id}:
 *   patch:
 *     summary: Pubblica la reiposta an una recensione
 *     description: Pubblica la risposta alla recensione che corrisponde al parametro _id passato
 *     tags:
 *       - Review
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: Il parametro _id della recensione su cui viene publicata la risposta
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Dati risposta
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               response:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created. Risposta pubblicata
 *       404:
 *         description: Not Found. Recensione non Trovata
 *       500:
 *         description: Internal Server Error. Si è verificato un problema durante la publicazione della risposta
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

export async function PATCH(req: NextRequest, { params } : { params: Params }) {
    try {
        const req_body = await req.json();

        const review = await Review.findByIdAndUpdate(
            params._id,
            { $set: { response: req_body.response } },
            { new: true }
        )

        if (!review) { 
            throw new my_error("Recensione non trovata", 404)
        }

        return NextResponse.json({
            success: true,
            message: "Risposta pubblicata"
        }, {
            status: 201,
        })
    } catch (error: any) {
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/reviews/responde/[_id]' --> ", error.message)

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un problema durante la publicazione della risposta",
            }, {
                status: error.status || 500
            }
        )
    }
}