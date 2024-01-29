// Import necessary modules and configurations
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user_model";
import { connect_DB } from "../../../config/db-config";

/**
 * @swagger
 * /api/user/{email}:
 *   get:
 *     summary: Retrieve user information
 *     description: Retrieves user information based on the provided email.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email of the user to retrieve information.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK. User information retrieved successfully.    
 *       404:
 *         description: Not Found. User not found.
 *       500:
 *         description: Internal Server Error. An error occurred while retrieving user information.
 */

// Define interface for route parameters
interface Params {
    email: string;
}

class my_error extends Error {
    status: number;
    constructor(text: string, status: number) {
      super(text);
      this.status = status;
    }
} 

// Connect to the database
connect_DB();

// API endpoint for retrieving user information
export async function GET(req: NextRequest, { params }: { params: Params }) {
    try {
        // Find user by email
        const user = await User.findOne({ email: params.email });

        if (!user){
            throw new my_error("(!!) Utente non trovato", 404);
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
