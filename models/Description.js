const mongoose = require('mongoose');

const descriptionSchema = mongoose.Schema({
    body: String,
    animal: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Animal'
    }],
});

const Description = mongoose.model('Description', descriptionSchema);

module.exports = Description;