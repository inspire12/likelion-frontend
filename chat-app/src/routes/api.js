const express = require('express');
const router = express.Router();
const { getDummyCards } = require('../controllers/dataController');

router.get('/cards', getDummyCards);

module.exports = router;
