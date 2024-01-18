const express = require("express");
const router = express.Router();

const Workspace = require("../models/Workspace");
const User = require("../models/User");

// GET - Read All workspaces
router.get("/", (req, res) => {
  Workspace.find()
    .then((allWorkspaces) => {
      res.json(allWorkspaces);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// POST - Add a new workspace
router.post("/", (req, res) => {
  const { name, workspaceURL, createdBy, members } = req.body;
  Workspace.create({
    name,
    workspaceURL,
    createdBy,
    members,
  })
    .then((createdWorkspace) => {
      res.json(createdWorkspace);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// GET - Get a single workspace by id
router.get("/:workspaceId", (req, res) => {
  const { workspaceId } = req.params;
  Workspace.findById(workspaceId)
    .then((selectedWorkspace) => {
      res.json(selectedWorkspace);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// POST - Update a single workspace by id
router.put("/:workspaceId", (req, res) => {
  const { workspaceId } = req.params;

  Workspace.findByIdAndUpdate(workspaceId, req.body, { new: true })
    .then((updatedWorkspace) => {
      if (!updatedWorkspace) {
        return res.status(404).json({ error: "Workspace not found" });
      }
      res.json(updatedWorkspace);
    })
    .catch((err) => {
      console.error("Error updating workspace:", err);
      res.status(500).json({ error: err.message });
    });
});

// GET - Delete a single workspace by id
router.delete("/:workspaceId", (req, res) => {
  const { workspaceId } = req.params;
  Workspace.findByIdAndDelete(workspaceId)
    .then((deletedWorkspace) => {
      res.json(deletedWorkspace);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
