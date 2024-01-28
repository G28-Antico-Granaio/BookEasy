// Import necessary modules and configurations
import { connect_DB } from "../../config/db-config";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: User Login
 *     description: Authenticates a user based on the provided email and password.
 *     tags:
 *       - User
 *     requestBody:
 *       description: User login data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 description: The user's password for authentication.
 *     responses:
 *       201:
 *         description: OK. User successfully logged in.
 *       404:
 *         description: Not Found. User not found.
 *       401:
 *         description: Unauthorized. Invalid credentials.
 *       500:
 *         description: Internal Server Error. An error occurred during user login.
 */

class my_error extends Error {
    status: number;
    constructor(text: string, status: number) {
      super(text);
      this.status = status;
    }
} 

// Connect to the database
connect_DB();

// API endpoint for handling user login
export async function POST(req: NextRequest) {
    try {
        const req_body = await req.json();

        // check if user exists in the DB or not
        const user = await User.findOne({ email: req_body.email });

        // Handle non-existing user
        if (!user) {
            throw new my_error("(!!) Non esiste un utente registrato con questo indirizzo e-mail", 404);
        }

        // Check if the password is correct
        const password_match = await bcrypt.compare(req_body.password, user.password);

        // Handle wrong password
        if (!password_match) {
            throw new my_error("(!!) Credenziali inserite non valide", 401);
        }

        // Success response with user data and isAdmin status
        return NextResponse.json({
            success: true,
            message: "Login Effettuato",
            data: {
                isAdmin: user.isAdmin,
            },
        }, {
            status: 201
        });
    } catch (error: any) {
        // Log the error message
        console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/login' --> ", error.message);

        // Error response with
        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante il login dell'utente",
        }, {
            status: error.status || 500
        });
    }
}
