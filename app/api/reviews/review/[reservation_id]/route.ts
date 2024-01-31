import { connect_DB } from "@/app/config/db-config";
import Review from "@/app/models/review_model";
import { NextRequest, NextResponse } from "next/server";

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
            console.log(new_review);

            await new_review.save()

            return NextResponse.json({
                success: true,
                message: "Prenotazione Pubblicata"
            }, {
                status: 201,
            })
        } else {
            throw new my_error("Recensione già fatta", 409);
        } 
    } catch (error: any) {
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/reviews/review' --> ", error.message)

        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la publicazione della recensione",
            }, {
                status: error.status || 500
            }
        )
    }
}