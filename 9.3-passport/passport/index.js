const passport = require('passport');
const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user');

/*
    전체 과정:
    1. 라우터를 통해 로그인 요청(call api)
    2. 라우터에서 passport.authenicate 메소드 호출
    3. 로그인 전략 수행
    4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
    5. req.login 메소드가 passport.serializeUser 호출
    6. req.session에 사용자 아이디 저장
    7. 로그인 완료
*/

/* 
    로그인 이후 과정 
    1. 요청
    2. 라우터 요청 도달 전에 passport.session 미들웨어가 passport.deserializeUser 메소드 호출
    3. req.session에 저장된 아이디로 db 사용자 조회
    4. 조회된 사용자 정보를 req.user에 저장
    5. 라우터에서 req.user 객체 사용 가능    
*/

module.exports = () => {
    //로그인시 실행 req.session 객체에 어떤 데이터를 저장할지 정하는 메서드.
    // 매개변수 user를 받고 done 함수에 두 번째 인수로 user.id를 넘김
    passport.serializeUser((user,done)=>{
        done(null,user.id);
    });

    //매 요청시 실행, passport.session 미들웨어가 해당 메서드를 호출함 done의 두번째 인수로 넣었던 데이터가 해당 메서드의 매개변수
    //serializeUser로 로그인시 세션에 로그인 데이터를 저장하고, 세션에 저장한 아이디를 통해 사용자 정보 객체를 불러옴
    passport.deserializeUser((id,done)=>{
        User.findOne({
            where:{id},
            include: [{
                model:User,
                attributes:['id','nick'],
                as: 'Followers',
            },{
                model:User,
                attributes:['id','nick'],
                as:'Followings',
            }],
        })
            .then(user=>done(null,user))
            .catch(err => done(err));
    });

    local();
    kakao();
}