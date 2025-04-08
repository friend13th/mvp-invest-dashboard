import React, { useState, useEffect } from "react";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useNavigate } from "react-router-dom";
import {
  getInvestmentSummary,
  getGrowthData,
  getHoldings,
  baseUrl,
} from "../services/api";

interface InvestmentData {
  totalValue: number;
  monthlyChange: number;
  growthData: Array<{
    date: string;
    value: number;
  }>;
  holdings: Array<{
    name: string;
    symbol: string;
    logoUrl: string;
    funFact: string;
  }>;
}

interface User {
  id: string;
  username: string;
  role: "Parent" | "Child" | "Co-Parent";
  name: string;
}

const Dashboard: React.FC = () => {
  const [investmentData, setInvestmentData] = useState<InvestmentData | null>(
    null
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      console.error("User not found in localStorage");
      navigate("/login");
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const summary = await getInvestmentSummary();
        const growthData = await getGrowthData();
        const holdings = await getHoldings();

        setInvestmentData({
          totalValue: summary.totalValue,
          monthlyChange: summary.monthlyChange,
          growthData: growthData,
          holdings: holdings,
        });
      } catch (error) {
        console.error("Error fetching investment data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  if (!investmentData) {
    return <Typography>Error loading investment data</Typography>;
  }

  if (!user) {
    return <Typography>Loading user data...</Typography>;
  }

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
          {/* Investment Summary */}
          <Box sx={{ flex: "1 1 45%", minWidth: "300px" }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Investment Summary
              </Typography>
              <Typography variant="h3" color="primary">
                ${investmentData.totalValue.toFixed(2)}
              </Typography>
              <Typography
                variant="h6"
                color={
                  investmentData.monthlyChange >= 0
                    ? "success.main"
                    : "error.main"
                }
              >
                {investmentData.monthlyChange >= 0 ? "⬆️" : "⬇️"} Your money{" "}
                {investmentData.monthlyChange >= 0 ? "grew" : "decreased"} by $
                {Math.abs(investmentData.monthlyChange).toFixed(2)} this month
              </Typography>
            </Paper>
          </Box>

          {/* Growth Chart */}
          <Box sx={{ flex: "1 1 45%", minWidth: "300px" }}>
            <Paper elevation={3} sx={{ p: 3, height: "100%" }}>
              <Typography variant="h5" gutterBottom>
                Growth Chart
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={investmentData.growthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
            </Paper>
          </Box>

          {/* Holdings */}
          <Box sx={{ flex: "1 1 100%" }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom>
                Your Holdings
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                {investmentData.holdings.map((holding) => (
                  <Box
                    key={holding.symbol}
                    sx={{ flex: "1 1 30%", minWidth: "250px" }}
                  >
                    <Card>
                      <CardContent>
                        <Box
                          sx={{ display: "flex", alignItems: "center", mb: 1 }}
                        >
                          <Box
                            component="img"
                            src={`${baseUrl}${holding.logoUrl}`}
                            alt={`${holding.name} logo`}
                            sx={{
                              width: 40,
                              height: 40,
                              mr: 2,
                              objectFit: "contain",
                            }}
                          />
                          <Box>
                            <Typography variant="h6">{holding.name}</Typography>
                            <Typography color="textSecondary">
                              {holding.symbol}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography variant="body2" sx={{ mt: 1 }}>
                          <strong>Fun Fact:</strong> {holding.funFact}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Box>
                ))}
              </Box>
            </Paper>
          </Box>

          {/* Chat Button */}
          <Box sx={{ flex: "1 1 100%" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate("/chat")}
              sx={{ mt: 2 }}
            >
              {user.role === "Child" ? "Ask My Parent" : "Family Chat"}
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Dashboard;
