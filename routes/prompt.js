const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const axios = require("axios");

//prompt
router.post("/:email", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    console.log("req.body.promptURL", req.body.promptURL);
    if (user) {
      console.log("two");

      const productTitle = {
        method: "POST",
        url: "https://api.cohere.ai/v1/generate",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
        data: {
          max_tokens: 60,
          truncate: "END",
          return_likelihoods: "NONE",
          prompt: `only give me the title of ${req.body.promptURL} without other unnecessary text`,
        },
      };

      const productDescription = {
        method: "POST",
        url: "https://api.cohere.ai/v1/generate",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
        data: {
          max_tokens: 60,
          truncate: "END",
          return_likelihoods: "NONE",
          prompt: `give a brief description of ${req.body.promptURL}`,
        },
      };

      try {
        console.log("three");
        const responseTitle = await axios.request(productTitle);
        const responseDescription = await axios.request(productDescription);
        const itemTitle = responseTitle.data.generations[0].text;
        const itemDescription = responseDescription.data.generations[0].text;

        const updatedArray = [
          ...user.products,
          {
            title: itemTitle,
            description: itemDescription,
            url: req.body.promptURL,
          },
        ];

        const updatedUser = await User.updateOne(
          { email: req.params.email },
          { products: updatedArray }
        );

        console.log("user", user);
        res.status(200).json({
          userData: updatedArray
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

router.post("/delete/:email", async (req, res) => {
  console.log("DELETE");
  try {
    const user = await User.findOne({ email: req.params.email });
    console.log("req.body.url", req.body.url);
    if (user) {
      try {
        console.log("two");
        const productUrls = user.products.filter((product) => {
          //   console.log(" url != req.body.url", product.url != req.body.url);
          //   console.log(" url", product.url);
          //   console.log(" url ", req.body.url);
          return product.url != req.body.url;
        });
        await User.updateOne(
          { email: req.params.email },
          { products: productUrls }
        );

        // console.log("user", user);
        res.status(200).json({
          newProductsUrl: productUrls,
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
    console.log("user.products", user.products);

    if (user) {
      res.json({
        productUrls: user.products,
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
