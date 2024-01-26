// Import necessary modules and configurations
import { connect_DB } from "@/configs/dbConfig";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

// Define interface for route parameters
interface Params {
  email: string;
}

// Connect to the database
connect_DB();

// API endpoint for resetting user password
export async function POST(req: NextRequest, { params }: { params: Params }) {
  try {
    // Parse request body
    const req_body = await req.json();

    // Fetch user data from another API endpoint
    const response = await fetch(`http://localhost:3000/api/user/${params.email}`);
    
    // Handle non-existing user
    if (!response.ok) {
      throw new Error("(!!) Utente non trovato");
    }

    // Extract user data from the response
    const user = await response.json();

    // Compare old and new passwords
    const is_password_different = await bcrypt.compare(req_body.password, user.data.password);
    
    // Handle matching old and new passwords
    if (is_password_different) {
      throw new Error("(!!) Password vecchia e nuova corrispondono");
    }

    // Generate salt and hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await bcrypt.hash(req_body.password, salt);
    req_body.password = hashed_password;

    // Update user password in the database
    await User.findOneAndUpdate(
      { email: params.email },
      req_body,
      { new: true }
    );

    // Return success response
    return NextResponse.json({
      success: true,
      message: "Password modificata",
    }, {
      status: 200
    });
  } catch (error: any) {
    // Log the error message
    console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di 'api/reset-password/[email]' --> " + error.message);

    // Return error response
    return NextResponse.json({
      success: false,
      message: error.message || "Si è verificato un errore durante il reset della password",
    }, {
      status: error.status || 500
    });
  }
}
