const express = require('express');
const router = express.Router();
const postCtrl = require('../controllers/posts');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config')

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:token_user', auth, postCtrl.getOnePosts);
router.post('/', auth, multer, postCtrl.createPosts);
router.put('/:token_user', auth, multer, postCtrl.modifyPosts);
router.delete('/:token_user', auth, postCtrl.deletePosts);
router.post('/:id/like', auth, postCtrl.postLikes);
router.post('/:id/comments', auth, postCtrl.postComments);
router.put('/:id/comments/:id', auth, postCtrl.modifyComments);
router.delete('/:id/comments/:id', auth, postCtrl.deleteComments);


module.exports = router;