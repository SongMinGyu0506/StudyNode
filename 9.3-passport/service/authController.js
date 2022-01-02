const User = require("../models/user");
const bcrypt = require('bcrypt');
const passport = require("passport");

module.exports = {

    authJoinPost: async (req,res,next)=>{
        //req.body(form data)로 부터 email,nick,password를 받음
        const {email,nick,password} = req.body;
        try {
            //등록되어있는 이메일일 경우
            const exUser = await User.findOne({where:{email}});
            if (exUser) {
                return res.redirect('/join?error=exist');
            }
            //등록 안되어있을경우 password를 12자리로 해싱
            const hash = await bcrypt.hash(password,12);

            //디비 등록
            await User.create({
                email,
                nick,
                password: hash,
            });

            //메인화면으로 리턴
            return res.redirect('/');
        } catch(err) {
            console.error(err);
            return next(err);
        }
    },

    authLoginPost: async (req,res,next) =>{
        //로그인 인증 절차 
        //파라미터: 로그인 모드, (에러,유저데이터,정보?)
        passport.authenticate('local',(authError,user,info)=>{
            //에러가 있다면
            if (authError) {
                console.error(authError);
                return next(authError);
            }
            //유저 데이터가 없다면
            if (!user) {
                return res.redirect(`/?loginError=${info.message}`);
            }
            //그외 정상 작동시
            return req.login(user,(loginError)=>{
                //로그인 에러
                if (loginError) {
                    console.error(loginError);
                    return next(loginError);
                }
                return res.redirect('/');
            });
        })(req,res,next)
    },

    authLogoutGet: async (req,res)=>{
        req.logout();
        req.session.destroy();
        res.redirect('/');
    }
};