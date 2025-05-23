import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Avatar,
  TextField,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png"; // Ensure this path is correct
import { joinSwarm } from "../api/swarm";

const JoinSwarm = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [swarmId, setSwarmId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleJoin = async () => {
    setError("");
    if (!swarmId || !password || password.length < 8) {
      setError("Please enter valid swarm ID and a password (min 8 characters)");
      return;
    }
    try {
      await joinSwarm(swarmId, password);
      alert(`Joined swarm successfully!\nSwarm ID: ${swarmId}`);
      localStorage.setItem("swarmId", swarmId);
      navigate("/files");
    } catch (err) {
      setError("Join failed. Please check swarm ID and password.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: theme.palette.primary.main,
        display: "flex",
        flexDirection: "column",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 1.5,
          borderBottom: `1px solid ${theme.palette.custom.border}`,
        }}
      >
        <Box display="flex" alignItems="center">
          <img
            src={logo}
            alt="11Fire Logo"
            style={{ width: 31, height: 50, marginRight: 8 }}
          />
          <Typography variant="h5" fontWeight={800} color="text.primary">
            11Fire
          </Typography>
        </Box>
        <Avatar sx={{ bgcolor: theme.palette.secondary.main }}>N</Avatar>
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: 360,
            display: "flex",
            flexDirection: "column",
            mt: -15,
          }}
        >
          <Typography
            variant="h5"
            fontWeight={600}
            sx={{
              mb: 4,
              textAlign: "center",
              color: theme.palette.text.primary,
            }}
          >
            Join Group
          </Typography>

          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "1rem",
              color: theme.palette.text.primary,
              mb: 1,
            }}
          >
            Group Name
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter name" // or "Enter passcode"
            value={swarmId} // or password
            onChange={(e) => setSwarmId(e.target.value)} // or setPassword
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": {
                  borderColor: theme.palette.custom.border,
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.text.primary,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.text.primary, 
                  borderWidth: "1px",
                },
              },
              input: { py: 1.5 },
              mb: 2,
            }}
          />

          <Typography
            sx={{
              fontWeight: 500,
              fontSize: "1rem",
              color: theme.palette.text.primary,
              mb: 1,
            }}
          >
            Group Passcode
          </Typography>
          <TextField
            fullWidth
            placeholder="Enter name" // or "Enter passcode"
            value={password} // or password
            onChange={(e) => setPassword(e.target.value)} // or setPassword
            variant="outlined"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
                "& fieldset": {
                  borderColor: theme.palette.custom.border,
                },
                "&:hover fieldset": {
                  borderColor: theme.palette.text.primary,
                },
                "&.Mui-focused fieldset": {
                  borderColor: theme.palette.text.primary, // ✅ Keep border visible on focus
                  borderWidth: "1px",
                },
              },
              input: { py: 1.5 },
              mb: 2,
            }}
          />

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 2,
            }}
          >
            <Button
              onClick={handleJoin}
              sx={{
                width: "200px", // exact width
                height: "44px",
                bgcolor: theme.palette.secondary.main,
                color: "white",
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                mb: 2, // vertical spacing
                "&:hover": { opacity: 0.9 },
              }}
            >
              Join
            </Button>

            <Button
              variant="outlined"
              onClick={() => navigate("/swarm")}
              sx={{
                width: "200px", // exact width
                height: "44px",
                borderRadius: 2,
                color: theme.palette.text.primary,
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 500,
                bgcolor: "#F8CFCB", // soft pink
                border: "none",
                "&:hover": { bgcolor: "#f4b8b2" },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default JoinSwarm;
