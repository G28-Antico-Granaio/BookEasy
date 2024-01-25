import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
    {
        _id: {type: String},
        name: { type: String, required: true },
        surname: { type: String, required: true },
        tel_number: { type: Number, required: true },
        tel_area_code: { type: Number, required: true },
        email: { type: String, required: true, unique: true  },
        isAdmin: { type: Boolean, default: false, require: false },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export default mongoose.models["User"] || mongoose.model("User", userSchema);