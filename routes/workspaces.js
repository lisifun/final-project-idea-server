const express = require("express");
const router = express.Router();

const Workspace = require("../models/Workspace");

// GET - Read All workspaces
router.get("/", (req, res) => {
  Workspace.find()
    .populate("user")
    .then((allWorkspaces) => {
      res.json(allWorkspaces);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST - Add a new workspace
router.post("/", (req, res) => {
  const { name, workspaceURL } = req.body;
  Workspace.create({
    name,
    workspaceURL,
    createdBy: req.user._id,
  })
    .then((createdWorkspace) => {
      res.json(createdWorkspace);
    })
    .catch((err) => {
      res.json(err);
    });
});

//
// GET - Get a single workspace by id
router.get("/:workspaceId", (req, res) => {
  Workspace.findById(req.params.workspaceId)
    .populate("user")
    .then((selectedWorkspace) => {
      res.json(selectedWorkspace);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST - Update a single workspace by id
router.put("/:workspaceId", (req, res) => {
  Workspace.findByIdAndUpdate(req.params.workspaceId, req.body, { new: true })
    .then((updatedWorkspace) => {
      res.json(updatedWorkspace);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET - Delete a single workspace by id
router.delete("/:workspaceId", (req, res) => {
  Workspace.findByIdAndDelete(req.params.workspaceId)
    .populate("user")
    .then((deletedWorkspace) => {
      res.json(deletedWorkspace);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
