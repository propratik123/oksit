// formDataModel.js

const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hobbies: {
        type: [String],
        default: []
    },
    gender: {
        type: String,
        enum: ['Male', 'Female'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    profileImg: {
        type: String // Assuming you'll store the path to the uploaded image
    }
});

const FormDataModel = mongoose.model('FormData', formDataSchema);

module.exports = FormDataModel;
