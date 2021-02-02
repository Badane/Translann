const db = require("../models");
const Translation = db.translation;

// Create and Save a new translation
exports.create = (req, res) => {
    // Validate request
    if (!(req.body.projectId && req.body.language)) {
        res.status(400).send({
            message: "Some required fields are empty !"
        });
        return;
    }

    // Create a translation
    const translation = {
        projectId: req.body.projectId,
        language: req.body.language,
        translated: req.body.translated
    };

    // Save Langauge in the database
    Translation.create(translation)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while creating the translation."
        });
    });
};

// Find a single translation with an id
exports.findOne = (req, res) => {
    Translation.find({_id:req.params.id})
    .then(data => {
        res.send(data[0]);
    })
    .catch(err => {
        res.status(500).send({
            message:
            err.message || "Some error occurred while getting the translation."
        });
    })
};

// Find a single translation with project's id
exports.findFromProject = (req, res) => {
    Translation.find({projectId:req.params.id})
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        console.log(err.message)
        res.status(500).send({
            message:
            err.message || "Some error occurred while getting the translation."
        });
    })
};

// Update a translation by the id in the request
exports.update = (req, res) => {
  
};

// Delete a translation with the specified id in the request
exports.delete = (req, res) => {
  
};
