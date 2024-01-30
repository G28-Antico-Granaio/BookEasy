import { connect_DB } from "@/app/config/db-config";
import Review from "@/app/models/review_model";
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

export async function PUT(req: NextRequest, { params } : { params: Params }) {
    try {
        const req_body = req.json();

        const review = Review.findByIdAndUpdate(
            { _id: params._id},
            req_body,
            { new: true }
        );

        if (!review) {
            throw new my_error("Recensione non Trovata", 404)
        }

        return NextResponse.json({
            success: true,
            message: "Risposta Pubblicata"
        }, {
            status: 201,
        })
    } catch (error: any) {
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/reviews/response' --> ", error.message)

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la publicazione della risposta",
            }, {
                status: error.status || 500
            }
        )
    }
}