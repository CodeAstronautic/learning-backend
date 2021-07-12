const router = require('express').Router();
const postController = require('../controllers/postController');
const verify = require('./verifyToken');

router.post('/create',verify, postController.createPost);
router.get('/get',verify, postController.getPost);
router.put('/update/:id',verify, postController.updatePost);
router.delete('/delete/:id',verify, postController.deletePost);
router.put('/tag/:id',verify, postController.tagPosts);
router.post('/comment/:id',verify, postController.postComment);
router.get('/get/comments/:id',verify, postController.getComment);

module.exports = router;