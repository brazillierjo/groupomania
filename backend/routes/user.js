const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete/:token_user', userCtrl.delete);
router.put('/update/:token_user', userCtrl.modify);
router.get('/profile/:token_user', userCtrl.display);
router.get('/getCurrentUser/:token_user', userCtrl.getCurrentUser);

module.exports = router;