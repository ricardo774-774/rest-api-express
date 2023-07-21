const { Router } = require('express');
const { check } = require('express-validator');

const { search } = require('../controllers/search.controller');

// const { validator } = require('../middlewares/validator.middleware');

const router = Router();

router.get('/:collection/:term', search );

module.exports = router;