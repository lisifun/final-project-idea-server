const express = require("express");
const router = express.Router();

const Ticket = require("../models/Ticket");

// POST
router.post("/", (req, res) => {
  console.log("Evento recibido");
  if (req.body.pull_request.body) {
    console.log("dentro del if");
    const pullRequestStatus = req.body.pull_request.state;

    const sentTicketId = String(
      req.body.pull_request.body.split(" ").filter((word) => {
        return word[0] === "#";
      })
    ).slice(1, 7);

    console.log("sentTicketId => ", sentTicketId);
    Ticket.find()
      .then((tickets) => {
        const filteredTickets = tickets.filter((ticket) =>
          ticket._id.toString().startsWith(sentTicketId)
        );
        console.log("first then", filteredTickets[0], pullRequestStatus);
        if (
          filteredTickets[0].status === "todo" &&
          pullRequestStatus === "open"
        ) {
          console.log("inside the second if");
          Ticket.findByIdAndUpdate(
            filteredTickets[0]._id,
            { status: "in-progress" },
            { new: true }
          )
            .then((updatedTickets) => {
              console.log("inside the second then");
              res.json(updatedTickets);
            })
            .catch((err) => {
              console.log("first catch => ", err);
              res.status(500).json({ error: err.message });
            });
        } else if (pullRequestStatus === "closed") {
          console.log("inside the else if");
          Ticket.findByIdAndUpdate(
            filteredTickets[0]._id,
            { status: "done" },
            { new: true }
          )
            .then((updatedTickets) => {
              console.log("inside the third then");
              res.json(updatedTickets);
            })
            .catch((err) => {
              console.log("second catch => ", err);
              res.status(500).json({ error: err.message });
            });
        }
      })
      .catch((err) => {
        console.log("third catch => ", err);
        console.error(err);
      });
  }
});

module.exports = router;
