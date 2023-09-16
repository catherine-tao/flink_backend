const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");


//signup 
router.post("/:email", async (req, res) => {
    try {
        const user = await User.findOne({email: req.params.email});
        console.log("req.body.backgroundUrl", req.body.backgroundUrl);
    } catch (error) {
        console.log("error");
    }
});

module.exports = router;
