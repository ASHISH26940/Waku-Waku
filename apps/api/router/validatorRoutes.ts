import express from "express";
import cors from "cors";
import {
  getValidator,
  withdrawAmount,
} from "../controller/validatorController";
const router = express.Router();
router.use(cors({
    origin: '*', // Allow all origins (change this for security)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
router.post("/", getValidator);
router.post("/withdraw", withdrawAmount);
export default router;