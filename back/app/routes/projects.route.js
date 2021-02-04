module.exports = app => {
    const projects = require("../controllers/projects.controller.js");
  
    var router = require("express").Router();
  
    // Create a new project
    router.post("/", projects.create);
    
    // Add new key
    router.put("/:id/key", projects.setNewKey);
  
    // Retrieve all projects
    router.get("/", projects.findAll);
  
    // Retrieve a single project with id
    router.get("/:id", projects.findOne);
  
    // Update a project with id
    router.put("/:id", projects.update);
  
    // Delete a project with id
    router.delete("/:id", projects.delete);
  
    app.use('/api/projects', router);
  };