const router = require('express').Router();
const postController = require('../controllers/postController');

router.post('/create', postController.createPost);
router.get('/get', postController.getPost);
router.put('/update/:id', postController.updatePost);
router.delete('/delete/:id', postController.deletePost);
router.put('/tag/:id', postController.tagPosts);
router.post('/comment/:id', postController.postComment);
router.get('/get/comments/:id', postController.getComment);

module.exports = router;