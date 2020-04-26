const { Schema, model } = require('mongoose');

const SolutionSchema = new Schema({
    solutionName: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    userEmail: {
        type: String,
        required: true
    },
    userAdress: {
        type: String,
        required: true
    },
    imgs: {
        type: [{}],
        required: true
    },
    videos: {
        type: [{}]
    },
    geolocation: {
        type: {},
        required: true
    } 
});

module.exports = model('Solution', SolutionSchema);