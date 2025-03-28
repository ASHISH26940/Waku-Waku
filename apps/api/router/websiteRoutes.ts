import express from "express";
import cors from "cors";
import {
  createWebsite,
  getWebsites,
  getWebsiteDetails,
  toggleWebsite,
} from "../controller/websiteController";
const router = express.Router();
router.use(cors({
    origin: '*', // Allow all origins (change this for security)
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  }));
router.get("/", getWebsites);
router.get("/:id", getWebsiteDetails);
router.post("/create", createWebsite);
router.get("/toggle/:id", toggleWebsite);
export default router;