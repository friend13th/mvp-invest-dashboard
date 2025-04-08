import express from "express";
import { getMessages, sendMessage } from "../controllers/chatController";

const router = express.Router();

// Get all messages for a family group
router.get("/messages", getMessages);

// Send a new message
router.post("/messages", sendMessage);

export default router;
