const express = require("express");
const router = express.Router();

const Ticket = require("../models/Ticket");
const Workspace = require("../models/Workspace");

// GET - Read all tickets in a Workspace
router.get("/:workspaceId", async (req, res) => {
  try {
    // Find the workspace by ID and populate the tickets field
    const workspaceWithTickets = await Workspace.findById(
      req.params.workspaceId
    ).populate("tickets");

    if (!workspaceWithTickets) {
      return res.status(404).json({ error: "Workspace not found" });
    }

    // Extract and send the tickets array
    const allTickets = workspaceWithTickets.tickets;

    res.json(allTickets);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// POST - Add a new ticket
router.post("/:workspaceId", (req, res) => {
  const { title, description, status, priority, label, assignee } = req.body;
  Ticket.create({
    title,
    description,
    status,
    priority,
    label,
    assignee,
    workspace: req.params.workspaceId,
  })
    .then((createdTicket) => {
      return Workspace.findByIdAndUpdate(
        req.params.workspaceId,
        {
          $push: { tickets: createdTicket._id },
        },
        { new: true }
      );
    })
    .then((workspaceToPopulate) => {
      return workspaceToPopulate.populate("tickets");
    })
    .then((updatedWorkspace) => {
      res.json(updatedWorkspace);
    })
    .catch((err) => {
      res.status(500).json({ err: "Internal Server Error" });
    });
});

// // GET - Get a single ticket by id
router.get("/:workspaceId/:ticketId", (req, res) => {
  const { ticketId } = req.params;
  Ticket.findById(ticketId)
    .populate("workspace")
    .then((selectedTicket) => {
      res.json(selectedTicket);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// POST - Update a single ticket by id
router.put("/:workspaceId/:ticketId", (req, res) => {
  Ticket.findByIdAndUpdate(req.params.ticketId, req.body, { new: true })

    .then((updatedTicket) => {
      res.json(updatedTicket);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET - Delete a single ticket by id
router.delete("/:workspaceId/:ticketId", (req, res) => {
  const { ticketId } = req.params;
  Ticket.findByIdAndDelete(ticketId)
    .then((selectedTicket) => {
      res.json(selectedTicket);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
