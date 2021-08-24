const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({

    schoolId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    firstName: {
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    fatherName: {
        type: String,
        required: true
    },

    motherName: {
        type: String,
        required: true
    },

    dob: {
        type: String,
        required: true
    },

    gender: {
        type: String,
        required: true
    },

    catagory: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },

    contact: {
        type: String,
        required: true
    },

    class: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    studentLng: {
        type: String,
        required: true
    },

    studentLat: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('Student', studentSchema);