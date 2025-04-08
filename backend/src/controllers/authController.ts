import { Request, Response } from "express";
import * as fs from "fs";
import * as path from "path";

// Load mock data from JSON file
const familyGroupsPath = path.join(__dirname, "../mock-data/familyGroups.json");
const familyGroups = JSON.parse(fs.readFileSync(familyGroupsPath, "utf8"));

// Extract users from family groups
const users = Object.values(familyGroups).flatMap((group: any) =>
  group.members.map((member: any) => ({
    id: member.userId,
    username: member.userId,
    role: member.role,
    name: member.name,
  }))
);

/**
 * Handle user login
 * @param req Request object with username and role
 * @param res Response object
 */
export const login = (req: Request, res: Response) => {
  const { username, role } = req.body;

  const user = users.find((u) => u.role === role);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    user: {
      id: user.id,
      username: user.id,
      role: user.role,
      name: user.name,
    },
  });
};
