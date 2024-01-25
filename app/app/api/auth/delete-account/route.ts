// Import necessary modules and configurations
import { connect_DB } from "@/configs/dbConfig";

import User from "@/app/models/user_model";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Connect to the database
connect_DB();

// API route handling POST requests
export async function POST(req: NextRequest) {
    try {
        const req_body = await req.json();

        // Get user
        const user = await User.findOne({ email: req_body.email });
        
        // Compare the provided password with the stored hashed password
        const password_match = await bcrypt.compare(req_body.password, user.password);
        
        // Handle wrong password
        if (!password_match) {
            throw new Error("ERRORE: Credenziali inserite non valide");
        }

        // Delete the user from the database based on their email
        await User.findOneAndDelete({ email: user.email });

        // Return success response
        return NextResponse.json({
            message: "Eliminazione account Effettuata",
        },
        {
            status: 200
        });

    } catch (error: any) {
        // Log and return error response
        console.log(" !! ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/delete-account' --> " + error.message);
        return NextResponse.json({
            message: error.message,
        },
        {
            status: 400
        });
    }
}