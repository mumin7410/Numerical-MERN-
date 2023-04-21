const mongoose = require("mongoose");

const numerSchema = new mongoose.Schema({
    x: {
        type: Number,
        required: true,
    },
    y: {
        type: Number,
        required: true,
    }
});

const numer_Root_Schema = new mongoose.Schema({
    EQ:{
        type: String,
        required: true,
    },
    a: {
        type: Number,
        required: true,
    },
    b: {
        type: Number,
        required: true,
    }
});
const Numer_Root = mongoose.model('numer_Root', numer_Root_Schema)
const Numer = mongoose.model('numer', numerSchema)

module.exports = {Numer_Root, Numer};