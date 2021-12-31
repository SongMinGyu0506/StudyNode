const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/',async(req,res,next)=>{
    try {
        const users = await User.findAll();
        res.render('sequelize',{users}); //sequelize.html에 user객체 넘겨줌
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;