//Import
const dbConfig = require("../config/db.config.js");
const project = require("./project.model.js")
const translation = require("./translation.model.js")

//Dependencies
const mongoose = require('mongoose');

mongoose.connect('mongodb://' + dbConfig.host + '/' + dbConfig.db, { useNewUrlParser: dbConfig.useNewUrlParser, useUnifiedTopology: dbConfig.useUnifiedTopology });
mongoose.set('useFindAndModify', false);

const mongo = mongoose.connection;
mongo.on('error', console.error.bind(console, 'connection error:'));

const db = {};
db.project = mongo.model('Project', project);
db.translation = mongo.model('Translation', translation);

module.exports = db;