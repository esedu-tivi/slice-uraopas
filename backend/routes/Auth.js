const express = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  try {
    const { username, firstName, lastName, age, password, field } = req.body;

    //tarkista onko username jo olemassa
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Käyttäjänimi on jo käytössä" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      firstName,
      lastName,
      age,
      password: hashedPassword,
      field,
      progress: {
        stepOne: {
                done: false,
                taskOne: {
                        done: false,
                        answer: null
                },
                taskTwo: {
                        done:false
                }
        },
        stepTwo: {
                done: false,
                taskOne: {
                        done: false,
                        answer: null
                },
                taskTwo: {
                        done:false,
                        answer: null
                }  
        }
      }
    });

    res.json({ message: "User created", userId: user._id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;


    //etsi käyttäjä
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Käyttäjää ei löytynyt" });
    }

    //tarkista salasana
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ error: "Väärä salasana" });
    }

    res.json({
      message: "Kirjautuminen onnistui!",
      userId: user._id,
      progress: user.progress
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Change progress and answers
router.patch("/progress/:step", async (req, res) => {
        try {
                const stepName = req.params.step;

                if (!["stepOne", "stepTwo"].includes(stepName)) {
                        return res.status(400).json({ error: "Invalid step" });
                }

                const { userName } = req.body;
                const stepData = req.body[stepName];

                if (!userName || !stepData) {
                        return res.status(400).json({
                                error: "Username and step contents are required",
                        });
                }

                const user = await User.findOneAndUpdate(
                        { username: userName },
                        {
                                $set: {
                                [`progress.${stepName}`]: stepData,
                                },
                        },
                        { returnDocument: 'after' }
                );

                if (!user) {
                        return res.status(404).json({ error: "User not found" });
                }

                return res.json({
                        progress: user.progress,
                });
        } catch (error) {
                console.error("Saving failed:", error);
                return res.status(500).json({ error: "Saving failed" });
        }
});

module.exports = router;