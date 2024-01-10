const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Ticket = require("../models/Ticket");

// GET - Read all tickets
router.get("/", (req, res) => {
  Ticket.find()
    .populate("workspace")
    .populate("project")
    .then((allTickets) => {
      res.json(allTickets);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST - Add a new ticket
router.post("/", (req, res) => {
  const { title, description, status, priority, label, deadline } = req.body;
  Ticket.create({
    title,
    description,
    status,
    priority,
    members: [],
    label,
    project: req.project._id,
    deadline,
    workspace: req.workspace._id,
  })
    .then((createdTicket) => {
      res.json(createdTicket);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET - Get a single ticket by id
router.get("/:ticketId", (req, res) => {
  Ticket.findById(req.params.ticketId)
    .populate("workspace")
    .populate("project")
    .then((selectedTicket) => {
      res.json(selectedTicket);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST - Update a single ticket by id
router.put("/:ticketId", (req, res) => {
  Ticket.findByIdAndUpdate(req.params.ticketId, req.body, { new: true })

    .then((updatedTicket) => {
      res.json(updatedTicket);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET - Delete a single ticket by id
router.delete("/:ticketId", (req, res) => {
  Ticket.findByIdAndDelete(req.params.ticketId)
    .populate("workspace")
    .populate("project")
    .then((selectedTicket) => {
      res.json(selectedTicket);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
