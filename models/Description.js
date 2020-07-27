const mongoose = require('mongoose');

const descriptionSchema = mongoose.Schema({
    body: String
});

const Description = mongoose.model('Description', descriptionSchema);

module.exports = Description;