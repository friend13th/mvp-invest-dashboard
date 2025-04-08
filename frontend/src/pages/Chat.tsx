import {
  Box,
  Button,
  Container,
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChatMessages, sendChatMessage } from "../services/api";

interface Message {
  id: number;
  senderId: string;
  role: string;
  message: string;
  timestamp: string;
  name: string;
}

interface User {
  id: string;
  role: string;
  name: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    } else {
      console.error("Chat: User not found in localStorage");
    }

    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await getChatMessages();
        setMessages(response);
      } catch (error) {
        console.error("Error fetching chat messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !currentUser) return;

    try {
      const messageData = {
        familyId: "fam_001",
        sender: currentUser.id,
        role: currentUser.role,
        name: currentUser.name,
        message: newMessage,
      };

      const response = await sendChatMessage(messageData);

      setMessages([...messages, response]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString();
  };

  if (loading) {
    return <Typography>Loading chat...</Typography>;
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h5" gutterBottom>
            Family Chat
          </Typography>

          <Box
            sx={{
              height: "400px",
              overflowY: "auto",
              mb: 2,
              p: 2,
              bgcolor: "background.default",
            }}
          >
            <List sx={{ display: "flex", flexDirection: "column", alignItems: 'flex-start' }}>
              {messages.map((message, index) => {
                const isCurrentUser = message.role === currentUser?.role;
                return (
                  <ListItem
                    key={index}
                    alignItems="flex-start"
                    sx={{
                      alignSelf: isCurrentUser ? "flex-end" : "flex-start",
                      maxWidth: "75%",
                      my: 0.5,
                      p: 0,
                      width: 'auto'
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: isCurrentUser ? "primary.light" : "grey.200",
                        p: 1.5,
                        borderRadius: "10px",
                        color: isCurrentUser
                          ? "primary.contrastText"
                          : "text.primary",
                        display: "inline-block",
                      }}
                    >
                      <ListItemText
                        primary={
                          <Typography component="span" variant="subtitle2">
                            {message.name}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body1"
                              sx={{ display: "block", wordBreak: "break-word" }}
                            >
                              {message.message}
                            </Typography>
                            <Typography
                              component="span"
                              variant="caption"
                              display="block"
                              sx={{ textAlign: "right", mt: 0.5 }}
                            >
                              {formatTimestamp(message.timestamp)}
                            </Typography>
                          </>
                        }
                      />
                    </Box>
                  </ListItem>
                );
              })}
            </List>
          </Box>

          <form onSubmit={handleSendMessage}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: "1 1 85%" }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
              </Box>
              <Box sx={{ flex: "1 1 15%" }}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ height: "100%" }}
                >
                  Send
                </Button>
              </Box>
            </Box>
          </form>

          <Box sx={{ mt: 3 }}>
            <Button variant="outlined" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Chat;
