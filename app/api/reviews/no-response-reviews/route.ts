import Review from "@/app/models/review_model";
import { connect_DB } from "@/app/config/db-config";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/reviews/no-response-review:
 *   get:
 *     summary: Prende le recensioni senza risposta
 *     description: Restituisce tutte le recensioni senza il campo response
 *     tags:
 *       - Review
 *     responses:
 *       200:
 *         description: OK. Recensioni senza rispota trovate/Non ci sono recensioni senza rispota trovate
 *       500:
 *         description: Internal Server Error. Si è verificato un errore durante l'estrazione delle recensioni
 */


connect_DB();

export async function GET(req: NextRequest) {
  try {
    const data = await Review.find({
      response: { $exists: false }
    });

    let message = "Recensioni senza rispota trovate";
    if (!data || data.length === 0) {
      message = "Non ci sono recensioni senza rispota trovate";
    }

    return NextResponse.json({
      success: true,
      message: message,
      data: data,
    }, {
      status: 200
    });
  } catch (error: any) {
    console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/reviews/no-response-review' --> ", error.message);

    return NextResponse.json({
      success: false,
      message: error.message || "Si è verificato un errore durante l'estrazione delle recensioni",
    }, {
      status: error.status || 500
    });
  } 
}