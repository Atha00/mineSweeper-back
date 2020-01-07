const express = require("express");
const router = express.Router();

const Intermediate = require("../models/intermediate");

router.post("/intermediates/new", async (req, res) => {
  try {
    let reg = /^[a-zàäâéèêëïîöôùüû\s]*$/i;
    if (reg.test(req.body.pseudo)) {
      if (req.body.pseudo.length >= 3 && req.body.pseudo.length <= 10) {
        const newIntermediateScore = new Intermediate({
          score: req.body.score,
          pseudo: req.body.pseudo
        });
        await newIntermediateScore.save();
        res.status(200).json(newIntermediateScore);
      } else {
        res.status(400).json({
          problem: "Your nick name don't got right length (min 3, max 10)"
        });
      }
    } else {
      res.status(400).json({
        problem: "Please avoid all special characters from your nick name !"
      });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/intermediates", async (req, res) => {
  try {
    const foundScores = await Intermediate.find()
      .sort({ score: 1 })
      .limit(10);
    res.status(200).json(foundScores);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
