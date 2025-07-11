import express from "express";
const router = express.Router();
import { signup, forgotApiKey } from "../controller/controller.js";
import { checkSignupData } from "../middleware/mailValidator.js";

router.post("/signup", checkSignupData, signup);
router.get("/forgot/:email", forgotApiKey);

export default router;
