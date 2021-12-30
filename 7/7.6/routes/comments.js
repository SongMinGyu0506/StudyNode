const express = require('express');
const {User, Comment} = require('../models');

const router = express.Router();

router.get('/',async (req,res,next)=>{
    try {
        const comment = await Comment.findAll();
        res.json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
})
router.post('/',async (req,res,next)=>{
    try {
        const comment = await Comment.create({
            commenter:req.body.id,
            comment:req.body.comment,
        });
        console.log(comment);
        res.status(201).json(comment);
    } catch (err) {
        console.error(err);
        next(err);
    }
});

router.route('/:id')
    .get(async (req,res,next)=> {
        try {
            const result = await Comment.findAll({
                where: {commenter:req.params.id},
            });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .patch(async (req,res,next)=>{
        try{
            const result = await Comment.update({
                comment: req.body.comment,
            },{
                where: {id:req.params.id},
            });
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    })
    .delete(async (req,res,next)=>{
        try {
            const result = await Comment.destroy({where:{id:req.params.id}});
            res.json(result);
        } catch (err) {
            console.error(err);
            next(err);
        }
    });

module.exports = router;