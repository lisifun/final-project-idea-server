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
  // console.log("req.body => ", req.body);
  console.log("pull_request => ", req.body.pull_request);

  const pullRequestStatus = req.body.pull_request.state;

  const sentTicketId = String(
    req.body.pull_request.body.split(" ").filter((word) => {
      return word[0] === "#";
    })
  ).slice(1, 7);

  // console.log(allTickets);
  console.log(sentTicketId);
  // console.log(
  //   allTickets.filter((ticket) => {
  //     return ticket._id.slice(0, 6) === sentTicketId;
  //   })
  // );

  Ticket.find()
    .then((tickets) => {
      const filteredTickets = tickets.filter((ticket) =>
        ticket._id.toString().startsWith(sentTicketId)
      );
      console.log(filteredTickets);
      console.log(filteredTickets[0]);
      console.log("ticket status => ", filteredTickets[0].status);
      console.log("pull_request status => ", pullRequestStatus);
      if (
        filteredTickets[0].status === "todo" &&
        pullRequestStatus === "open"
      ) {
        console.log("here");
        console.log("ticket id => ", filteredTickets[0]._id);
        Ticket.findByIdAndUpdate(
          filteredTickets[0]._id,
          { status: "in-progress" },
          { new: true }
        )
          .then((updatedTickets) => {
            console.log(updatedTickets);
            res.json(updatedTickets);
          })
          .catch((err) => {
            res.status(500).json({ error: err.message });
          });
      } else if (pullRequestStatus === "close") {
        Ticket.findByIdAndUpdate(
          filteredTickets[0]._id,
          { status: "done" },
          { new: true }
        )
          .then((updatedTickets) => {
            console.log(updatedTickets);
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
  // Github.create({
  //   // pullRequest: req.body.pull_request,
  //   state: req.body.pull_request.state,
  //   description: req.body.pull_request.body,
  //   sentTicketId: sentTicketId,
  // })
  //   .then((createdPullRequest) => {
  //     res.json(createdPullRequest);
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   });
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
