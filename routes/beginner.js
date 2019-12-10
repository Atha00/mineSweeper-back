const express = require("express");
const router = express.Router();

const Beginner = require("../models/beginner");

router.post("/beginners/new", async (req, res) => {
  try {
    const newBeginnerScore = new Beginner({
      score: req.body.score,
      pseudo: req.body.pseudo
    });
    await newBeginnerScore.save();
    res.status(200).json(newBeginnerScore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/beginners", async (req, res) => {
  try {
    const foundScores = await Beginner.find()
      .sort({ score: 1 })
      .limit(5);
    res.status(200).json(foundScores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
