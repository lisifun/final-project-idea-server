const express = require("express");
const router = express.Router();

const User = require("../models/User");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;

// GET - Get user by id
router.get("/:userId", (req, res) => {
  User.findById(req.params.userId)
    .then((foundUser) => {
      res.json(foundUser);
    })
    .catch((err) => {
      res.json(err);
    });
});

// PUT - Update user by id
router.put("/:userId", (req, res) => {
  User.findByIdAndUpdate(req.params.userId, req.body, { new: true })
    .then((updatedUser) => {
      res.json(updatedUser);
    })
    .catch((err) => {
      res.json(err);
    });
});
