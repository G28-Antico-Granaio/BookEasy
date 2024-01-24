import { NextRequest } from "next/server";
import jwt  from "jsonwebtoken";

export const validateJWT = async (req: NextRequest) => {
    try {
        //get token
        const token = req.cookies.get("token")?.value || "";

        //handle non existing token
        if (!token) {
            throw new Error("Nessun token presente")
        }

        //decrypt token
        const decrypted_token: any = jwt.verify(token, process.env.JWT_SECRET!);

        //return user id
        return decrypted_token._id;

    } catch (error: any) {
        //error message
        throw new Error(" !! ERRORE: nella validazione del token --> " + error.message);
    }
} 