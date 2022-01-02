const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const User = require('../models/user');
const AuthController = require('../service/authController');

const router = express.Router();

router.post('/join',isNotLoggedIn,AuthController.authJoinPost);
router.post('/login',isNotLoggedIn,AuthController.authLoginPost);
router.get('/logout',isLoggedIn,AuthController.authLogoutGet);

router.get('/kakao',passport.authenticate('kakao'));
router.get('/kakao/callback',passport.authenticate('kakao',{
    failureRedirect: '/',}),(req,res)=>{
        res.redirect('/');
    });

module.exports = router;