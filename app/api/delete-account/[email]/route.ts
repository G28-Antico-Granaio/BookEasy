// Import necessary modules and configurations
import { connect_DB } from "../../../config/db-config";

import User from "@/app/models/user_model";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /api/delete-account/{email}:
 *   post:
 *     summary: Delete user account
 *     description: Deletes the user account based on the provided email and password.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email of the user whose account needs to be deleted.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User deletion data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 description: The user's password for authentication.
 *     responses:
 *       200:
 *         description: OK. User account deletion successful.
 *       404:
 *         description: Not Found. User not found.
 *       401:
 *         description: Unauthorized. Invalid credentials.
 *       500:
 *         description: Internal Server Error. An error occurred during account deletion.
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

// API route handling POST requests
export async function POST(req: NextRequest, { params }: { params: Params }) {
    try {
        // Get form data from the request body
        const req_body = await req.json();

        // Get user
        const user = await User.findOne({ email: params.email });

        if (!user) {
            throw new my_error("(!!) Login non effettuato", 404);
        }
        
        // Compare the provided password with the stored hashed password
        const password_match = await bcrypt.compare(req_body.password, user.password);
        
        // Handle wrong password
        if (!password_match) {
            throw new my_error("(!!) Credenziali inserite non valide", 401);
        }

        // Delete the user from the database based on their email
        await User.findOneAndDelete({ email: user.email });

        // Return success response
        return NextResponse.json({
            success: true,
            message: "Eliminazione account Effettuata",
        }, {
            status: 200
        });

    } catch (error: any) {
        // Log and return error response
        console.log(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/delete-account' --> ", error.message);

        // Return error response with a meaningful message
        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la cancellazione dell'account",
        },{
            status: error.status || 500
        });
    }
}