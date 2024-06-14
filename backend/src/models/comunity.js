import mongoose from "mongoose";

const communitySchema = new mongoose.Schema(
  {
    post: [],
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("Community", communitySchema);
