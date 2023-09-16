const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//login
router.post("/", async (req, res) => {
  console.log("HIHIHIHI");
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("HIHIHIHI2", user);

    if (user) {
        console.log("HIHIHIHI3");

      const passwordIsValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (passwordIsValid) {
        console.log("HIHIHIHI4");

        // const token = jwt.sign({ email: user.email }, process.env.JWT_TOKEN);
        res.status(200).json({
          message: "Logged in successfully",
          signedIn: true,
        //   user: token,
        });
      } else {
        res.json({
          message: "Incorrect passowrd",
        });
      }
    } else {
      res.json({
        message: "Incorrect email",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
});

//get info
router.get("/:email", async (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    const decoded = jwt.verify(token, process.env.JWT_TOKEN);
    const user = await User.findOne({ email: decoded.email });

    if (user) {
      res.json({
        favoritedArray: user.favorites,
        usedGifs: user.usedGifs,
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
