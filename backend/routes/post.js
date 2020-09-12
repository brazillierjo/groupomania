const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:token_user', auth, postCtrl.getOnePosts);
router.post('/:token_user', auth, multer, postCtrl.createPosts);
router.put('/:token_user', auth, multer, postCtrl.modifyPosts);
router.delete('/posts/:token_user/:post_id', auth, postCtrl.deletePosts);
router.post('/:id/like', auth, postCtrl.postLikes);
router.get('/:token_user/comments/:id', auth, postCtrl.getAllcomments);
router.post('/:token_user/comments/:id', auth, postCtrl.postComments);
router.put('/:token_user/comments/:id', auth, postCtrl.modifyComments);
router.delete('/:token_user/comments/:id', auth, postCtrl.deleteComments);


module.exports = router;