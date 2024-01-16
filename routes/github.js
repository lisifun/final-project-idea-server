const express = require("express");
const router = express.Router();

/* GET github listing. */
router.post("/", function (req, res, next) {
  console.log(req.body);
  res.send("respond with a resource");
});

module.exports = router;
