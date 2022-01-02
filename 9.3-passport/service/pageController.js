const record = {
    initialize: (req,res,next)=> {
        res.locals.user = req.user; //넌적스 user 객체를 통해 사용자 정보 접근 가능
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