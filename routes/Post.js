const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');
const { restrict } = require('../services/authhelper');

router.post('/create', restrict, ctrl.post.createPost);
router.get('/all', ctrl.post.showAllPosts);
router.get('/:id', ctrl.post.showPost);
router.delete('/delete/:id', restrict, ctrl.post.deletePost);
router.put('/edit', restrict, ctrl.post.editPost);

module.exports = router;