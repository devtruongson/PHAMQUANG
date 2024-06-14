import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import translateRouter from "./routes/translate.js";
import postRouter from "./routes/post.js"
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";
import translate from "@iamtraction/google-translate";
import { Server as SocketIo } from 'socket.io'
dotenv.config();
// khởi tạo
const app = express();
const server = http.createServer(app);
export const io = new SocketIo(server);
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", authRouter);
app.use("/api", translateRouter);
app.use("/api", postRouter);

translate("i love you", { from: "en", to: "vi" })
  .then((res) => {
    console.log(res.text);
    console.log(res.from.autoCorrected); // OUTPUT: true
    console.log(res.from.text.value); // OUTPUT: [Thank] you
    console.log(res.from.text.didYouMean); // OUTPUT: false
  })
  .catch((err) => {
    console.error(err);
  });

await mongoose.connect(process.env.URI);
server.listen(3090, (req, res) => {
  try {
    console.log(`Server is running on port ${3090} `);
  } catch (error) {
    console.log(error);
  }
});
