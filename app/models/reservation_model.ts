import mongoose from "mongoose";

export const reservationSchema = new mongoose.Schema(
    {
        table_id: { type: Number, required: true },
        date: { type: Date, required: true },
        turn: { type: Number, required: true },
        cover_number: { type: Number, required: true },
        email: { type: String, required: true},
        name: { type: String, required: true },
        surname: { type: String, required: true }
    },
    {
        timestamps: true,
    }
);

reservationSchema.index({ table_id: 1, date: 1, turn: 1 }, { unique: true });

export default mongoose.models["Reservation"] || mongoose.model("Reservation", reservationSchema);