import express from "express";
import {
  getAllUsers,
  getIdUsers,
  removeNoteByUser,
  removeUser,
  saveNoteByUser,
  signin,
  signup,
  updateUser,
  signupBulk
} from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/signup/bulk", signupBulk);
router.post("/signin", signin);
router.post("/saveNoteByUser/:id", saveNoteByUser);
router.get("/get-allUser", getAllUsers);
router.get("/get-idUser/:id", getIdUsers);
router.get("/removeNoteByUser/:id", removeNoteByUser);
router.get("/remove-user/:id", removeUser);
router.post("/update-user/:id", updateUser);

export default router;
