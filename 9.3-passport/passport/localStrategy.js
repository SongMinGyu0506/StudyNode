const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');
module.exports = () => {
    passport.use(new LocalStrategy({
        //body form 데이터 id와 같음
        usernameField: 'email',
        passwordField: 'password',
        
        //매개변수의 email과 password는 위에서 생성한 usernameField, passwordField임
        //done 함수는 passport.authenticate의 콜백함수
    },async (email,password,done)=>{
        try {
            const exUser = await User.findOne({where:{email}});
            if (exUser) {
                const result = await bcrypt.compare(password, exUser.password);
                if (result) {
                    done(null, exUser);
                    // passport.authenticate('local',(authError->null,user->exUser,info)) 와 매칭
                } else {
                    done(null,false,{message:'비밀번호가 일치하지 않습니다.'});
                    /* passport.authenicate('local',(authError->null,
                                                                user->false,
                                                                info->{message:'비밀번호가 일치하지 않습니다.'})) 와 매칭*/
                }
            } else {
                done(null, false, {message:'가입되지 않은 회원입니다.'});
            }
        } catch(err) {
            console.error(err);
            done(error);
        }
    }));
};