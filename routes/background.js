// const router = require("express").Router();
// const bcrypt = require("bcrypt");
// const User = require("../models/user");
// const jwt = require("jsonwebtoken");
// const axios = require("axios");

// //prompt
// router.post("/:email", async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.params.email });
//     if (user) {
//       try {
//         await User.updateOne({
//           backgroundImage: req.body.backgroundUrl,
//         });

//         console.log("user", user);
//         res.status(200).json({
//           backgroundDoneUpdate: true,
//         });
//       } catch (error) {
//         res.status(500).json({
//           backgroundDoneUpdate: false,
//         });
//         console.error(error);
//       }
//     }
//   } catch (err) {
//     res.status(500).json({
//       error: err,
//     });
//   }
// });

// // router.get("/:email", async (req, res) => {
// //   console.log("byebye1");
// //   try {
// //     const user = await User.findOne({ email: req.params.email });
// //     console.log("user.products", user.products);

// //     if (user) {
// //       res.json({
// //         productUrls: user.products,
// //       });
// //     }
// //   } catch (err) {
// //     res.status(500).json({
// //       error: err,
// //       message: "Invalid token",
// //     });
// //   }
// // });

// module.exports = router;
