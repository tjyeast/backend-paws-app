const mongoose = require('mongoose');
const typeSchema = mongoose.Schema({
    type: {type: String, required: true}
})

const animalSchema = mongoose.Schema({
    image: {type: String, required: true},
    image2: String,
    image3: String,
    image4: String,
    name: {type: String, required: true},
    type: [typeSchema],
    age: {type: String, required: true},
    description: [{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'Description'
    }],
    user: [{
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: 'User'
    }]
})

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;