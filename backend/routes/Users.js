const express = require("express");
const User = require("../models/User");

const router = express.Router();

// GET käyttäjän tiedot
router.get("/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId).select("-password"); //salasana ei välity ProfileViewlle

    if (!user) {
      return res.status(404).json({ error: "Käyttäjää ei löytynyt" });
    }

    res.json(user);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
router.delete("/:id", async (req, res) => {
 try {
    const userId = req.params.id;

    //poista käyttäjä
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({
      message: "User deleted",
      userId: deletedUser._id
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;