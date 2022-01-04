const { Post, User, Hashtag } = require("../models");

const record = {
    initialize: (req,res,next)=> {
        res.locals.user = req.user; //넌적스 user 객체를 통해 사용자 정보 접근 가능
        res.locals.followerCount = req.user ? req.user.Followers.length : 0;
        res.locals.followingCount = req.user ? req.user.Followings.length : 0;
        res.locals.followerIdList = req.user ? req.user.Followings.map(f=>f.id):[];
        next();
    },
    pageProfileGet: (req,res) => {
        res.render('profile',{title: '내 정보 - NodeBird'});
    },
    pageJoinGet: (req,res) => {
        res.render('join',{title:'회원가입 - NodeBird'});
    },
    pageInitGet: async (req,res,next) => {
        try {
            const posts = await Post.findAll({
                include: {
                    model: User,
                    attributes:['id','nick'],
                },
                order: [['createdAt','DESC']],
            });
            res.render('main',{
                title: 'NodeBird',
                twits: posts,
            });
        } catch (err) {
            console.error(err);
            next(err);
        }
    },
    pageHashtagGet: async (req,res,next)=> {
        const query = req.query.hashtag;
        if(!query) {
            return res.redirect('/');
        }
        try {
            const hashtag = await Hashtag.findOne({where:{title:query}});
            let posts = [];
            if (hashtag) {
                posts = await hashtag.getPosts({include:[{model:User}]});
            }

            return res.render('main',{
                title: `${query}|NodeBird`,
                twits:posts, 
            });
        } catch (error) {
            console.error(error);
            return next(error);
        }
    }
}

module.exports = record;