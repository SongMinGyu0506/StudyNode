const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares')
const pageController = require('../service/pageController');
const router = express.Router();

router.use(pageController.initialize);
router.get('/profile',isLoggedIn,pageController.pageProfileGet);
router.get('/join',isNotLoggedIn,pageController.pageJoinGet);
router.get('/',pageController.pageInitGet);
router.get('/hashtag',pageController.pageHashtagGet);

module.exports = router;