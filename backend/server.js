require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// yhdistä tietokantaan
connectDB();

// middlewaret
app.use(cors());
app.use(express.json());
app.use(express.static('dist'))

// routet
app.use("/api/auth", require("./routes/Auth"));
app.use("/api/users", require("./routes/Users"));

//teksti API:n testaukseen
app.get("/", (req, res) => {
  res.send("API toimii");
});

//asettaa portin
const PORT = process.env.PORT || 5000;

//kertoo missä portissa serveri käynnissä
app.listen(PORT, () => {
  console.log(`Server käynnissä portissa ${PORT}`);
});