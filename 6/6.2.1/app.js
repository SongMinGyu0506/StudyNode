// middle ware
const express = require('express');
const path = require('path');
const app = express();
app.set('port',process.env.PORT || 3000);

app.use((req,res,next)=> {
    console.log('모든 요청에 다 실행됩니다.');
    //next가 다음 미들웨어로 넘어가는 함수, next가 실행되지 않으면 미들웨어는 작동하지 않음
    //next를 호출하지 않는 미들웨어의 경우 res.send나 res.sendFile로 따로 동작이 필요함.
    next();
});

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