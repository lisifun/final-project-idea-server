const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Project = require("../models/Project");

// GET - Read all projects
router.get("/", (req, res) => {
  Project.find()
    .populate("user")
    .populate("workspace")
    .then((allProjects) => {
      res.json(allProjects);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST - Add a new project
router.post("/", (req, res) => {
  const { title, description, status, startDate, targetDate } = req.body;
  Project.create({
    title,
    description,
    lead: req.user._id,
    status,
    members: [],
    startDate,
    targetDate,
    createdBy: req.user._id,
    workspace: req.workspace._id,
    tickets: req.ticket._id,
  })
    .then((createdProject) => {
      res.json(createdProject);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET - Get a single Project by id
router.get("/:projectId", (req, res) => {
  Project.findById(req.params.projectId)
    .populate("user")
    .populate("workspace")
    .then((selectedProject) => {
      res.json(selectedProject);
    })
    .catch((err) => {
      res.json(err);
    });
});

// POST - Update a single Project by id
router.put("/:projectId", (req, res) => {
  Project.findByIdAndUpdate(req.params.projectId, req.body, { new: true })
    .then((updatedProject) => {
      res.json(updatedProject);
    })
    .catch((err) => {
      res.json(err);
    });
});

// GET - Delete a single Project by id
router.delete("/:projectId", (req, res) => {
  Project.findByIdAndDelete(req.params.projectId)

    .then((selectedProject) => {
      res.json(selectedProject);
    })
    .catch((err) => {
      res.json(err);
    });
});

module.exports = router;
