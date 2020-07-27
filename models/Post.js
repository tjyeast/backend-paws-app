const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    image: String,
    body: {type: String, required: true},
    animal: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Animal'
    }],
    user: [{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }]
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
