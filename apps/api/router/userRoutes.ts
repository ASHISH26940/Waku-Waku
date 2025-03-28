import express from "express";
import { registerUser } from "../controller/userController";
import cors from "cors";

const router = express.Router();
router.use(cors({
    origin: '*', // Allow all origins (change this for security)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
router.post("/", registerUser);
export default router;