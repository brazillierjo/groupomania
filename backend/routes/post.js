const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

router.get('/', auth, postCtrl.getAllPosts);
router.get('/profile/:token_user', auth, postCtrl.getPostsUser);
router.get('/:id', auth, postCtrl.getOnePostId);
router.post('/:token_user', auth, multer, postCtrl.createPosts);
router.put('/:token_user/:id', auth, multer, postCtrl.modifyPosts);
router.delete('/:id', auth, postCtrl.deletePosts);
router.post('/:id/like', auth, postCtrl.postLikes);
router.post('/:id/dislike', auth, postCtrl.postDislike);
router.get('/:token_user/comments/:id', auth, postCtrl.getAllcomments);
router.post('/:token_user/comments/:id', auth, postCtrl.postComments);
router.put('/:token_user/comments/:id', auth, postCtrl.modifyComments);
router.delete('/:token_user/comments/:id', auth, postCtrl.deleteComments);


module.exports = router;