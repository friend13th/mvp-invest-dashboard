import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";

// Load mock data from JSON file
const chatMessagesPath = path.join(__dirname, "../mock-data/chatMessages.json");
let chatMessages = JSON.parse(fs.readFileSync(chatMessagesPath, "utf8"));

/**
 * Get all messages for a family group
 * @param req Request object with familyId query parameter
 * @param res Response object
 */
export const getMessages = (req: Request, res: Response) => {
  const familyId = (req.query.familyId as string) || "fam_001";
  const messages = chatMessages[familyId] || [];

  res.json(messages);
};

/**
 * Send a new message
 * @param req Request object with message details
 * @param res Response object
 */
export const sendMessage = (req: Request, res: Response) => {
  const { familyId, sender, role, name, message } = req.body;
  const familyGroupId = familyId || "fam_001";

  if (!chatMessages[familyGroupId]) {
    chatMessages[familyGroupId] = [];
  }

  const newMessage = {
    id: chatMessages[familyGroupId].length + 1,
    sender,
    role,
    name,
    message,
    timestamp: new Date().toISOString(),
  };

  chatMessages[familyGroupId].push(newMessage);

  res.status(201).json(newMessage);
};
