const express = require('express');
const { route } = require('.');

const router = express.Router();

// router.get('/',(req,res)=>{
//     res.send('Hello,User');
// });

router.get('/',(req,res,next)=>{
    next('route'); //아래의 미들웨어가 실행되지 않음, 주소와 일치하는 다음 라우터로 넘어감
}, (req,res,next)=>{
    console.log('실행되지 않습니다.');
    next();
}, (req,res,next)=> {
    console.log('실행되지 않습니다.')
    next();
});

router.get('/',(req,res)=>{
    console.log('실행됩니다.');
    res.send('Hello, Express');
});

/* 
    :id에 여러가지 값을 넣을 수 있음,
    :id의 값은 req.params 객체 안에 있고, req.query는 주소 이후 ? asdf=asdf 값 형태로 받으며,
    req.query에 받음

    일반 라우터보다 뒤에 위치해야함 (라우트 매개변수 뒤의 일반 라우터는 작동안함(겹칠경우))
*/
router.get('/:id',(req,res)=>{
    console.log(req.params,req.query);
});

module.exports = router;