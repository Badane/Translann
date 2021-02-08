const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    // userId: {
    //     type : ObjectId,
    //     required : true
    // },
    name: {
        type : String,
        required : true
    },
    description: {
        type : String,
        required : false
    },
    default: {
        type : String,
        enum: ['fr', 'en', 'es', 'it','de'],
        required : true
    },
    keys: {
        type : [String],
        required : true
    },
});

module.exports = schema;