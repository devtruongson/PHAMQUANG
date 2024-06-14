import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: String,
        email: {
            type: String,
            unique: true,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
        role: {
            type: String,
            default: "member",
        },
        note :[]
    },
    { timestamps: true, versionKey: false }
);

export default mongoose.model("User", userSchema);
