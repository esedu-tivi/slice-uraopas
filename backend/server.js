require("dotenv").config();

const path = require("path");
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

// API routes
app.use("/api/auth", require("./routes/Auth"));
app.use("/api/users", require("./routes/Users"));

// Serve the Vite frontend from backend/dist
const frontendPath = path.join(__dirname, "dist");

app.use(express.static(frontendPath));

// Send frontend index.html for client-side routes
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    return res.sendFile(path.join(frontendPath, "index.html"));
  }

  next();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server käynnissä portissa ${PORT}`);
});
