import { connect_DB } from "../../../../config/db-config";
import User from "@/app/models/user_model";
import { NextRequest, NextResponse } from "next/server";

/**
 * @swagger
 * /api/users/modify-credentials/{email}:
 *   put:
 *     summary: Modify user credentials
 *     description: Modifies user credentials based on the provided email.
 *     tags:
 *       - User
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         description: The email of the user whose credentials need to be modified.
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User credentials modification data.
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               surname:
 *                 type: string
 *               tel_number:
 *                 type: number
 *               tel_area_code:
 *                 type: number
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: OK. User credentials modified successfully.
 *       404:
 *         description: Not Found. User not found.
 *       409:
 *         description: Conflict. User already exists.
 *       500:
 *         description: Internal Server Error. An error occurred while modifying user credentials.
 */

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

connect_DB();

export async function PUT(req: NextRequest, { params }: { params: Params }) {
  try {
    const req_body = await req.json();

    if (params.email !== req_body.email) {
      const user_exists = await User.findOne({ email: req_body.email })
      if (user_exists) {
        throw new my_error("Indirizzo e-mail è già associato ad un account esistente", 409);
      }
    }
    
    const user = await User.findOne({ email: params.email});
    if (!user) {
      throw new my_error("Utente non trovato", 404);
    }

    if (user.tesl_number !== req_body.tel_number) {
      const used_tel_numb = await User.findOne({ tel_number: req_body.tel_number});
      if (used_tel_numb) {
        throw new my_error("Numero di telefono è già associato ad un account esistente", 409)
      }
    }

    const updated_user = await User.findOneAndUpdate(
      { email: params.email },
      req_body,
      { new: true }
    );
    if (!updated_user) {
      throw new my_error("Utente non trovato", 404);
    }

    return NextResponse.json({
      success: true,
      message: "Credenziali modificate",
    }, {
      status: 200
    });
  } catch (error: any) {
    console.error(" - ERRORE: è avvenuto un problema durante l'uso dell'api di '/api/users/modify-credentials/[email]' --> ", error.message);

    return NextResponse.json({
      success: false,
      message: error.message || "Si è verificato un errore durante la modifica delle credenziali dell'utente",
    }, {
      status: error.status || 500
    });
  }
}
