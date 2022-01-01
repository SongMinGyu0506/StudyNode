const record = {
    initialize: (req,res,next)=> {
        res.locals.user = null;
        res.locals.followerCount = 0;
        res.locals.followingCount = 0;
        res.locals.followerIdList = [];
        next();
    },
    pageProfileGet: (req,res) => {
        res.render('profile',{title: '내 정보 - NodeBird'});
    },
    pageJoinGet: (req,res) => {
        res.render('join',{title:'회원가입 - NodeBird'});
    },
    pageInitGet: (req,res,next) => {
        const twits = [];
        res.render('main',{
            title: 'NodeBird',
            twits,
        });
    }
}

module.exports = record;