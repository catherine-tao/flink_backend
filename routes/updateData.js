const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");


//signup 
router.put("/", async (req, res) => {
    console.log("here")
//   try {
//     const user = await User.find({ email: req.body.email });
//     // console.log(user);
//     if (user.length > 0) {
//       return res.status(409).json({
//         message: "This email is already signed up",
//       });
//     }
//     const salt = await bcrypt.genSalt(10);
//     const hashPassword = await bcrypt.hash(req.body.password, salt);

//     const newUser = await new User({
//       email: req.body.email,
//       password: hashPassword,
//     }).save();

//     console.log("user created", newUser)

//     res.status(201).json({
//       message: "New user created",
//       userCreated: true,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       error: err,
//     });
//   }
});

module.exports = router;
