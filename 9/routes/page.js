const express = require('express');
const pageController = require('../service/pageController');
const router = express.Router();

router.use(pageController.initialize);
router.get('/profile',pageController.pageProfileGet);
router.get('/join',pageController.pageJoinGet);
router.get('/',pageController.pageInitGet);

module.exports = router;