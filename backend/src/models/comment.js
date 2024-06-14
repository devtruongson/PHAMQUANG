import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    nameComment: String,
    idUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Comment", commentSchema);
