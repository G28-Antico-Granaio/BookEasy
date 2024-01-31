import { connect_DB } from "@/app/config/db-config";
import { NextRequest, NextResponse } from "next/server";
import Review from "@/app/models/review_model";

import dayjs from 'dayjs';

connect_DB();

export async function GET(req: NextRequest) {
    try {

        const yesterday = dayjs().subtract(1, 'day').toDate();

        const lastMonthStartDate = dayjs(yesterday).subtract(1, 'month').startOf('month').toDate();
        const lastMonthEndDate = dayjs(yesterday).endOf('day').toDate();

        const data = await Review.find({
            date: {
                $gte: lastMonthStartDate,
                $lt: lastMonthEndDate
            }
        });
    
        return NextResponse.json({
            success: true,
            message: "Recensioni Prese",
            data: data,
        }, {
            status: 200
        });
    } catch (error: any) {
        console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/reviews/all-review' --> ", error.message);
    
        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante l'estrazione delle recensioni",
        }, {
            status: error.status || 500
        });
    } 
}