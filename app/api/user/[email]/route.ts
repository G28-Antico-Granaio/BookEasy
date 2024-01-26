// Import necessary modules and configurations
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user_model";
import { connect_DB } from "@/configs/dbConfig";

// Define interface for route parameters
interface Params {
    email: string;
}

// Connect to the database
connect_DB();

// API endpoint for retrieving user information
export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        // Find user by email
        const user = await User.findOne({ email: params.email });

        if (!user){
            throw new Error("(!!) Utente non Trovato");
        }

        // Return success response with user data
        return NextResponse.json({
            success: true,
            data: user
        }, {
            status: 200
        });
    } catch (error: any) {
        // Log the error message
        console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/user/[email]' --> ", error.message);

        // Return error response with a meaningful message
        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante il recupero delle informazioni dell'utente",
        }, {
            status: error.status || 500
        });
    }
}
