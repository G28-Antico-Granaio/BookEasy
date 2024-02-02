import { connect_DB } from "@/app/config/db-config";
import Review from "@/app/models/review_model";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/reviews/response/{_id}:
 *   put:
 *     summary: Post a response to a review
 *     description: Posts a response to the specified review.
 *     tags:
 *       - Review
 *     parameters:
 *       - in: path
 *         name: _id
 *         required: true
 *         description: The ID of the review to which a response is being posted.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Response data.
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
 *         description: Created. Response posted successfully.
 *       404:
 *         description: Not Found. Review not found for the specified ID.
 *       500:
 *         description: Internal Server Error. An error occurred during the response posting.
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
        );

        if (!review) { 
            throw new my_error("Recensione non Trovata", 404)
        }

        return NextResponse.json({
            success: true,
            message: "Risposta pubblicata"
        }, {
            status: 201,
        })
    } catch (error: any) {
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/reviews/response/[_id]' --> ", error.message)

        return NextResponse.json({
            success: false,
            message: "Si è verificato un errore durante la publicazione della risposta",
            }, {
                status: 500
            }
        )
    }
}