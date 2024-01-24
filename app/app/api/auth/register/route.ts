// Import necessary modules and configurations
import { connect_DB } from "@/configs/dbConfig";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Connect to the database
connect_DB();

// API endpoint for handling user registration
export async function POST(req: NextRequest) {
    try {
        // Get form data from the request body
        const req_body = await req.json();

        // Check if the user already exists
        const user_exist = await User.findOne({ email: req_body.email });

        // Handle existing user
        if (user_exist) {
            throw new Error("(!!) Esiste già un utente registrato con questo indirizzo e-mail");
        }

        // Generate salt for password hashing
        const salt = await bcrypt.genSalt(10);

        // Hash the user's password
        const hashed_password = await bcrypt.hash(req_body.password, salt);
        req_body.password = hashed_password;

        // Create a new user instance with the form data
        const new_user = new User(req_body);

        // Save the new user to the database
        await new_user.save();

        // Return success response
        return NextResponse.json({
            success: true,
            message: "Utente Creato",
        }, {
            status: 200
        });
    } catch (error: any) {
        // Log the error message
        console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/register' --> ", error.message);

        // Return error response
        return NextResponse.json({
            success: false,
            message: error.message || "Si è verificato un errore durante la registrazione dell'utente",
        }, {
            status: 400
        });
    }
}
