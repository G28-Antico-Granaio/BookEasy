// Import necessary modules and configurations
import { connect_DB } from "@/configs/dbConfig";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Connect to the database
connect_DB();

// API endpoint for handling user login
export async function POST(req: NextRequest) {
    try {
        // Get data from the form
        const req_body = await req.json();

        // Check if the user exists
        const user = await User.findOne({ email: req_body.email });

        // Handle non-existing user
        if (!user) {
            throw new Error("(!!) Non esiste un utente registrato con questo indirizzo e-mail");
        }

        // Check if the password is correct
        const password_match = await bcrypt.compare(req_body.password, user.password);

        // Handle wrong password
        if (!password_match) {
            throw new Error("(!!) Credenziali inserite non valide");
        }

        // Success response with user data and isAdmin status
        return NextResponse.json({
            success: true,
            message: "Login Effettuato",
            data: {
                isAdmin: user.isAdmin,
            },
        }, {
            status: 200
        });
    } catch (error: any) {
        // Log the error message
        console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/login' --> ", error.message);

        // Error response with
        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante il login dell'utente",
        }, {
            status: 400
        });
    }
}
