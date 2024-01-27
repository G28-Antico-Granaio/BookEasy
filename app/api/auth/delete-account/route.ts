// Import necessary modules and configurations
import { connect_DB } from "@/configs/dbConfig";

import User from "@/app/models/user_model";

import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Connect to the database
connect_DB();

// API route handling POST requests
export async function DELETE(req: NextRequest) {
    try {
        // Get form data from the request body
        const req_body = await req.json();

        // Get user
        const user = await User.findOne({ email: req_body.email });

        if (!user) {
            throw new Error("(!!) Login non effettuato");
        }
        
        // Compare the provided password with the stored hashed password
        const password_match = await bcrypt.compare(req_body.password, user.password);
        
        // Handle wrong password
        if (!password_match) {
            throw new Error("(!!) Credenziali inserite non valide");
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