module.exports = app => {
    const translations = require("../controllers/translations.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Translation
    router.post("/", translations.create);
  
    // Retrieve a single Translation with id
    router.get("/:id", translations.findOne);

    // Retrieve a single Translation with Project's id
    router.get("/project/:id", translations.findFromProject);
  
    // Update a Translation with id
    router.put("/:id", translations.update);
    
    // Add translation key from project id
    router.put("/project/:id", translations.setKeyFromProject);
  
    // Delete a Translation with id
    router.delete("/:id", translations.delete);
  
    app.use('/api/translations', router);
  };