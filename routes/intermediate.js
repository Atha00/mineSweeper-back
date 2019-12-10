const express = require("express");
const router = express.Router();

const Intermediate = require("../models/intermediate");

router.post("/intermediates/new", async (req, res) => {
  try {
    const newIntermediateScore = new Intermediate({
      score: req.body.score,
      pseudo: req.body.pseudo
    });
    await newIntermediateScore.save();
    res.status(200).json(newIntermediateScore);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/intermediates", async (req, res) => {
  try {
    const foundScores = await Intermediate.find()
      .sort({ score: 1 })
      .limit(5);
    res.status(200).json(foundScores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
