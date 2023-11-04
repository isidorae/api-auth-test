const express = require('express')
const router = express.Router()
const { createPost, getPosts, updatePost, deletePost } = require('../controllers/post.controller')

router.get('/', getPosts);
router.post('/', createPost);
router.put('/', updatePost);
router.delete('/', deletePost)

module.exports = router;