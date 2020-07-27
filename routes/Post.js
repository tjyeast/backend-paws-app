const express = require('express');
const router = express.Router();
const ctrl = require('../controllers');

router.post('/create', ctrl.post.createPost);
router.get('/all', ctrl.post.showAllPosts);
router.get('/:id', ctrl.post.showPost);
router.delete('/delete/:id', ctrl.post.deletePost);
router.put('/edit/:id', ctrl.post.editPost);

module.exports = router;