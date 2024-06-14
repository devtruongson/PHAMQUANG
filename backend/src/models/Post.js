import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
   title : String,
   user :{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
   },
   content : String,
   tym :[],
   comments : []
  },
  { timestamps: true, versionKey: false }
);

export default mongoose.model("PostSchema", PostSchema);
