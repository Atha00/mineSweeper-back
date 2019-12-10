const express = require("express");
const router = express.Router();

const Expert = require("../models/expert");

router.post("/experts/new", async (req, res) => {
  try {
    const newExpertScore = new Expert({
      score: req.body.score,
      pseudo: req.body.pseudo
    });
    await newExpertScore.save();
    res.status(200).json(newExpertScore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/experts", async (req, res) => {
  try {
    const foundScores = await Expert.find()
      .sort({ score: 1 })
      .limit(5);
    res.status(200).json(foundScores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
