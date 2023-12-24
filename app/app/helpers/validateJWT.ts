import { NextRequest } from "next/server";
import jwt  from "jsonwebtoken";

export const validateJWT = async (req: NextRequest) => {
    
    try {
        const token = req.cookies.get("token")?.value || "";
        if (!token) {
            throw new Error("Nessun token presente")
        }

        const decrypted_token: any = jwt.verify(token, process.env.JWT_SECRET!);
        return decrypted_token.id;

    } catch (error: any) {
        
        throw new Error("ERRORE token", error);
    }
} 