const db = require("../models");
const Project = db.project;
const translations = require("./translations.controller");

// Create and Save a new Project
exports.create = (req, res) => {
    // Validate request
    if (!(req.body.name && req.body.language)) {
        res.status(400).send({
            message: "Some required fields are empty !"
        });
        return;
    }

    // Create a project
    const project = {
        name: req.body.name,
        description: req.body.description,
        default: req.body.language
    };

    // Save Tutorial in the database
    Project.create(project)
    .then(data => {
        req.body.projectId = data._id;
        translations.create(req, res);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the Project."
        });
    });
};

// Retrieve all Projects from the database.
exports.findAll = (req, res) => {
    Project.find({})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while getting the projects."
        });
    })
};

// Find a single Project with an id
exports.findOne = (req, res) => {
    Project.find({_id:req.params.id})
    .then(data => {
        res.send(data[0]);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while getting the projects."
        });
    })
};

// Update a Project by the id in the request
exports.update = (req, res) => {
  
};

// Delete a Project with the specified id in the request
exports.delete = (req, res) => {
  
};

// Delete all Projects from the database.
exports.deleteAll = (req, res) => {
  
};

// Find all published Projects
exports.findAllPublished = (req, res) => {
  
};