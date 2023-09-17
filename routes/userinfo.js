const router = require("express").Router();
const User = require("../models/user");
const axios = require("axios");

/**
 * email: ""
 * socials: ["","",""]
 * backgroundUrl: ""
 */

//prompt
router.post("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    console.log("req.body.backgroundUrl", req.body.backgroundUrl);
    if (user) {
      console.log("two");
      try {
        console.log("three");

        const updatedUser = await User.updateOne(
          { email: req.params.email },
          { instagram: req.params.socials[0] },
          { facebook: req.params.socials[1] },
          { tiktok: req.params.socials[2] },
          { backgroundUrl: req.params.backgroundUrl }
        );

        console.log("user", user);
        res.status(200).json({
          backgroundUrl: req.params.backgroundUrl
        });
      } catch (error) {
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
  console.log("byebye1");
  try {
    const user = await User.findOne({ email: req.params.email });
    console.log("user.backgroundUrl", user.backgroundUrl);

    if (user) {
      res.json({
        backgroundUrl: user.backgroundUrl
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
