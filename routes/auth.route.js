const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth.controller');
const { validator } = require('../middlewares/validator.middleware');

const router = Router();

router.post('/login',[
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validator
], login);

router.post('/google',[
    check('id_token', 'Google token required').not().isEmpty(),
    validator
], googleSignIn);

module.exports = router;