const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");

//prompt
router.post("/:email", async (req, res) => {
  try {
    console.log("backgrounding", req.body.backgroundUrl);
    const user = await User.findOne({ email: req.params.email });
    console.log(user);
    if (user) {
      console.log("i'm here", user);

      try {
        await User.updateOne(
          { email: req.params.email },
          { backgroundImage: req.body.backgroundUrl }
        );

        res.status(200).json({
          backgroundDoneUpdate: true,
        });
      } catch (error) {
        res.status(500).json({
          backgroundDoneUpdate: false,
        });
        console.error(error);
      }
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

router.get("/:email", async (req, res) => {
    try {
      const user = await User.findOne({ email: req.params.email });
  
      if (user) {
        res.json({
          backgroundUrl: user.backgroundImage,
        });
      }
    } catch (err) {
      res.status(500).json({
        error: err,
        message: "Invalid token",
      });
    }
  });

module.exports = router;
