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

// Add new key at existing project
exports.setNewKey = (req, res) => {
    // Validate request
    if (!(req.body.newKey)) {
        res.status(400).send({
            message: "Some required fields are empty !"
        });
        return;
    }

    //Mongoose option to make it returns new document and not the old one, when updating
    const optionUpdate = {
        new: true
    }

    Project.findById(req.params.id).then(data => {
        let project = data;
        project.keys.push(req.body.newKey);
        Project.findByIdAndUpdate(req.params.id, project, optionUpdate).then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while getting the projects."
            });
        })
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while getting the projects."
        });
    })
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
    Project.findById(req.params.id)
    .then(data => {
        res.send(data);
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