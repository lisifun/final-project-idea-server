const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Github = require("../models/Github");
const Ticket = require("../models/Ticket");

/* POST github listing. */
// router.post("/", function (req, res, next) {
//   console.log("req.body => ", req.body);

//   res.send("respond with a resource");
// });

// GET - Read all pull request from Github
router.get("/", (req, res) => {
  Github.find()
    .then((allPullRequest) => {
      res.json(allPullRequest);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// POST - Add a new pull request from Github
router.post("/", (req, res) => {
  if (req.body.pull_request.state && req.body.pull_request.body) {
    const pullRequestStatus = req.body.pull_request.state;

    const sentTicketId = String(
      req.body.pull_request.body.split(" ").filter((word) => {
        return word[0] === "#";
      })
    ).slice(1, 7);

    console.log(sentTicketId);

    Ticket.find()
      .then((tickets) => {
        const filteredTickets = tickets.filter((ticket) =>
          ticket._id.toString().startsWith(sentTicketId)
        );

        if (
          filteredTickets[0].status === "todo" &&
          pullRequestStatus === "open"
        ) {
          Ticket.findByIdAndUpdate(
            filteredTickets[0]._id,
            { status: "in-progress" },
            { new: true }
          )
            .then((updatedTickets) => {
              res.json(updatedTickets);
            })
            .catch((err) => {
              res.status(500).json({ error: err.message });
            });
        } else if (pullRequestStatus === "closed") {
          Ticket.findByIdAndUpdate(
            filteredTickets[0]._id,
            { status: "done" },
            { new: true }
          )
            .then((updatedTickets) => {
              res.json(updatedTickets);
            })
            .catch((err) => {
              res.status(500).json({ error: err.message });
            });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  // res.json();
});

// GET - Get a single pull request by id
router.get("/:pullRequestId", (req, res) => {
  const { pullRequestId } = req.params;
  Github.findById(pullRequestId)
    // .populate("user")
    .then((selectedPullRequest) => {
      res.json(selectedPullRequest);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
