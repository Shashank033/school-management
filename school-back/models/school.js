const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schoolSchema = new Schema({


    schoolName: {
        type: String,
        required: true
    },

    schoolCode: {
        type: String,
        required: true
    },

    schoolEmail: {
        type: String,
        required: true
    },

    schoolContact: {
        type: String,
        required: true
    },

    schoolAddress: {
        type: String,
        required: true
    },

    schoolLng: {
        type: String,
        required: true
    },

    schoolLat: {
        type: String,
        required: true
    },

    headName: {
        type: String,
        required: true
    },

    headEmail: {
        type: String,
        required: true
    },

    headContact: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('School', schoolSchema);
