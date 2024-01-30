import mongoose from "mongoose";

export const reviewSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        surname: { type: String, required: true },
        location: { type: Number, required: true },
        menu: { type: Number, required: true },
        service: { type: Number, required: true },
        bill: { type: Number, required: true },
        text: { type: String, required: true },
        response: { type: String, required: false}
    },
    {
        timestamps: true,
    }
);

export default mongoose.models["Review"] || mongoose.model("Review", reviewSchema);