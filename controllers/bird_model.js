
//import this data 
const mongoose = require("mongoose");

//Create bird Schema
const birdSchema = new mongoose.Schema({
    //  _id: mongoose.Schema.Types.ObjectId,
    primary_name: { type: String, required: true },
    english_name: { type: String, required: true },
    scientific_name: { type: String, required: true },
    order: { type: String, required: true },
    family: { type: String, required: true },
    other_names: { type: Array, required: true },
    status: { type: String, required: true },

    photo: {
        credit: { type: String, required: true },
        source: { type: String, required: true },
    },

    size: {
        length: {
            value: { type: Number, required: true },
            units: { type: String, required: true },
        },

        weight: {
            value: { type: Number, required: true },
            units: { type: String, required: true },
        }

    },




})

//Compile schema into model

const bird = mongoose.model('bird', birdSchema);

//export model
module.exports = bird;
