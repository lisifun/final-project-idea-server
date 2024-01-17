const express = require("express");
const router = express.Router();

const Ticket = require("../models/Ticket");
// This is comment to add

// POST - Add a new pull request from Github
router.post("/", (req, res) => {
  if (req.body.pull_request.body) {
    console.log("pull_request => ", req.body.pull_request);

    const pullRequestStatus = req.body.pull_request.state;

    const sentTicketId = String(
      req.body.pull_request.body.split(" ").filter((word) => {
        return word[0] === "#";
      })
    ).slice(1, 7);

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
              console.log(updatedTickets);
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
  }
});

module.exports = router;
