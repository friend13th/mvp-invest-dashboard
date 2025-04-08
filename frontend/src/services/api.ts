import axios from "axios";

export const baseUrl = process.env.REACT_APP_API_BASE_URL;
const api = axios.create({
  baseURL: baseUrl,
});

// Auth API
export const login = async (username: string, role: string) => {
  const response = await api.post("/api/auth/login", { username, role });
  return response.data;
};

// Investment API
export const getInvestmentSummary = async () => {
  const response = await api.get("/api/investments/summary");
  return response.data;
};

export const getGrowthData = async () => {
  const response = await api.get("/api/investments/growth");
  return response.data;
};

export const getHoldings = async () => {
  const response = await api.get("/api/investments/holdings");
  return response.data;
};

// Chat API
export const getChatMessages = async (familyId = "fam_001") => {
  const response = await api.get(`/api/chat/messages?familyId=${familyId}`);
  return response.data;
};

export const sendChatMessage = async (messageData: {
  familyId: string;
  sender: string;
  role: string;
  name: string;
  message: string;
}) => {
  const response = await api.post("/api/chat/messages", messageData);
  return response.data;
};
