const router = require('express').Router();

const profileController = require('../controllers/profile');

router.get('/:id', profileController.getProfile);

module.exports = router;
