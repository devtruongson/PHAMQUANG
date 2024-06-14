import mongoose from "mongoose";

const NotiSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    postUser :{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PostSchema",
    },
    dataNoti: String,
    watched: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("NotiSchema", NotiSchema);
