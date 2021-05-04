const router = require('express').Router();

const profileController = require('../controllers/profile');
const postController = require('../controllers/posts');

router.get('/:id', profileController.getProfile);

router.delete('/posts/deletePost', postController.deletePost);

module.exports = router;
