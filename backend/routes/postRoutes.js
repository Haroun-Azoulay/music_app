// routes/postRoutes.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const verifyToken = require('../middleware/verifyToken');


router.post('/create-post', postController.createPost, verifyToken);
router.get('/get-latest-post', postController.getLatestPost, verifyToken);
router.get('/get-post/:id', postController.getPostById, verifyToken);
router.get('/get-all-posts', postController.getAllPosts, verifyToken);
router.post('/update-post', postController.updatePost, verifyToken);
router.post('/delete-post', postController.deletePost, verifyToken);

module.exports = router;
