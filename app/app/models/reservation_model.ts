import mongoose from "mongoose";

export const reservationSchema = new mongoose.Schema(
    {
        table_id: { type: String, required: true },
        date: { type: Date, required: true },
        turn: { type: Number, required: true },
        cover_number: { type: Number, required: true },
        email: { type: String, required: true },
        name: { type: String, required: true },
        surname: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

export default mongoose.models["Reservation"] || mongoose.model("Reservation", reservationSchema);