import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
    {
        _id: {type: String, required: true},
        name: { type: String, required: true },
        surname: { type: String, required: true },
        location: { type: Number, required: true },
        menu: { type: Number, required: true },
        service: { type: Number, required: true },
        bill: { type: Number, required: true },
        text: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models["Review"] || mongoose.model("Review", userSchema);