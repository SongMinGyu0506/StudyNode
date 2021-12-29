const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();
const app = express();
app.set('port',process.env.PORT || 3000);

//각 미들웨어 호출 (req,res,next) 같은 매개변수가 안보이는 이유는 미들웨어 내부에 존재함
app.use(morgan('dev')); //morgan => 요청과 응답에 대한 정보를 기록함 ex) GET / 500 7.389 ms - 50

app.use('/',express.static(path.join(__dirname,'public'))); // 정적인 파일들을 제공하는 라우터 역할 해당 디렉터리의 public 디렉터리가 지정되어있음

app.use(express.json()); // body-parser express 4.16버전부터는 내장, 본문에 있는 데이터를 해석하여 req.body 객체로 만들어주는 미들웨어
app.use(express.urlencoded({extended:false}));

app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키를 분석하여 req.cookies 객체로 만들어줌

const indexRouter = require('./routes');
const userRouter = require('./routes/user');

//session 관리용 미들웨어, req.session 객체 안에 유지
// 인수로 세션에 대한 설정을 받음
app.use(session({
    resave: false, //세션 수정시 다시저장할 것인지
    saveUninitialized: false, // 저장내역이 없더라도 처음부터 생성할지 설정
    secret: process.env.COOKIE_SECRET, // 세션 관리시 쿠키를 전송하는 형식, 해당 쿠키 서명용임
    // 쿠키에 대한 설정
    cookie: {
        httpOnly: true,
        secure: false,
    },
    name:'session-cookie',
    // store => 메모리에 세션저장 배포시에는 데이터베이스에 연결하여 유지하는 것이 좋음 보통 레디스 사용
}));


//라우터 설정
app.use('/',indexRouter); //index.js는 생략 가능
app.use('/user',userRouter);

app.use((req,res,next)=> {
    console.log('모든 요청에 다 실행됩니다.');
    //next가 다음 미들웨어로 넘어가는 함수, next가 실행되지 않으면 미들웨어는 작동하지 않음
    next();
});

app.use('/test',(req,res,next)=>{
    console.log("/test에서만 작동합니다.");
    next();
})

app.get('/',(req,res,next)=>{
    console.log('GET / 요청에서만 실행됩니다.');
    next();
},(req,res)=>{
    // Error 강제발생 미들웨어
    throw new Error('에러는 에러 처리 미들웨어로 갑니다.')
});

//에러처리 미들웨어, 에러처리 미들웨어는 아래 4개의 매개변수가 필수임
app.use((err,req,res,next)=>{
    console.error(err);
    res.status(500).send(err.message);
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'),'번 포트에서 대기 중');
});