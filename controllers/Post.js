const Post = require('../models').Post;
const User = require('../models').User;
const Animal = require('../models').Animal;

const createPost = (req, res) => {
    Post.create(req.body, (err, createdPost) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(createdPost);
    })
}

const showPost = (req, res) => {
    Post.findById(req.params.id)
    .populate('user')
    .populate('animal')
    .exec((err, foundPost) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(foundPost);
    })
}

const showAllPosts = (req, res) => {
    Post.find({}, (err, foundAllPosts) => {
        if(err){
            return res.status(500).json(err);
        }
        res.status(200).json(foundAllPosts);
    })
}

const deletePost = (req, res)=>{
	Post.findByIdAndRemove(req.params.id, (err, deletedPost) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(deletedPost);
	});
}

const editPost = (req, res)=>{
	Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPost) => {
		if(err){
			return res.status(500).json(err);
		}
		res.status(200).json(updatedPost);
	});
}

module.exports = {
    createPost,
    showPost,
    showAllPosts,
    deletePost,
    editPost
}