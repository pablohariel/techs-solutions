const { Schema, model } = require('mongoose');

const SolutionSchema = new Schema({
    solutionName: {
        type: String,
        required: true
    },
    userName: {
        type: String
    },
    userEmail: {
        type: String
    },
    userAdress: {
        type: String
    },
    imgs: {
        type: [{}]
    },
    videos: {
        type: [{}]
    },
    geolocation: {
        type: String
    } 
});

module.exports = model('Solution', SolutionSchema);