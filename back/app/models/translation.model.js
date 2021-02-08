const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    projectId: {
        type : ObjectId,
        required : true
    },
    language: {
        type : String,
        enum: ['fr', 'en', 'es', 'it','de'],
        required : true
    },
    translated: {
        type : [String],
        required : true
    },
});

module.exports = schema;