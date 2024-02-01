import Review from "@/app/models/review_model";
import { connect_DB } from "@/app/config/db-config";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/reviews/no-response-review:
 *   get:
 *     summary: Get reviews without responses
 *     description: Retrieves reviews that do not have a response.
 *     tags:
 *       - Review
 *     responses:
 *       200:
 *         description: OK. Reviews retrieved successfully.
 *       500:
 *         description: Internal Server Error. An error occurred during the retrieval of reviews.
 */


connect_DB();

export async function GET(req: NextRequest) {
  try {
        
    const data = await Review.find({
      response: { $exists: false }
    });

    return NextResponse.json({
      success: true,
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