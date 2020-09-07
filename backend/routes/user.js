const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/delete/:id', userCtrl.delete);
router.put('/update/:id', userCtrl.modify);
router.get('/profile/:id', userCtrl.display);

module.exports = router;