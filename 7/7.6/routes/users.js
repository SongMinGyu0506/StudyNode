const express = require('express');
const User = require('../models/user');
const Comment = require('../models/comment');

const router = express.Router();

router.route('/')
    .get(async (req,res,next)=>{
        try {
            const users = await User.findAll(); //SELECT * FROM users
            res.json(users);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .post(async (req,res,next)=>{
        try {
            const user = await User.create({ // INSERT INTO users (name, age, married, comment) VALUES ('송민규',24,0,'');
                name:req.body.name,
                age:req.body.age,
                married:req.body.married,
            });
            console.log(user);
            res.status(201).json(user);
        } catch(err) {
            console.error(err);
            next(err);
        }
    });

router.get('/:id/comments',async (req,res,next)=>{
    try {
        const comments = await Comment.findAll({
            include: {
                model: User, //연결된 User 테이블 내용까지 가져옴(Join)
                where: {id:req.params.id},
            },
        });
        console.log(comments);
        res.json(comments);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

module.exports = router;