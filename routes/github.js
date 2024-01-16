const express = require("express");
const router = express.Router();

/* GET github listing. */
router.post("/", function (req, res, next) {
  console.log(req.body);
  console.log("hiii");
  res.send("respond with a resource");
});

module.exports = router;
