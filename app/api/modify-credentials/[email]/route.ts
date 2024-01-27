// Import necessary modules and configurations
import { connect_DB } from "@/configs/dbConfig";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";

// Define interface for route parameters
interface Params {
  email: string;
}

// Connect to the database
connect_DB();

// API endpoint for modifying user credentials
export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    // Get form data from the request body
    const req_body = await req.json();

    // Check if user exists and update the document
    const user = await User.findOneAndUpdate(
      { email: params.email },
      req_body,
      { new: true }
    );

    // Handle non-existing user
    if (!user) {
      throw new Error("(!!) Utente non trovato");
    }

    // Return success response with a meaningful message
    return NextResponse.json({
      success: true,
      message: "Credenziali Modificate",
    }, {
      status: 200
    });
  } catch (error: any) {
    // Log the error message
    console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/modify-credentials' --> ", error.message);

    // Return error response with a meaningful message
    return NextResponse.json({
      success: false,
      message: error.message || "Si è verificato un errore durante la modifica delle credenziali dell'utente",
    }, {
      status: error.status || 500
    });
  }
}
