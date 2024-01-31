import Review from "@/app/models/review_model";
import { connect_DB } from "@/app/config/db-config";
import { NextRequest, NextResponse } from "next/server";

connect_DB();

export async function GET(req: NextRequest) {
  try {
        
    const data = await Review.find({
      response: { $exists: false }
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