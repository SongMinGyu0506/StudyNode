# 특수 동작 미들웨어
next 함수에 인수를 넣으면 특수한 동작을 하는 미들웨어
```javascript
next(err)
//에러처리
(err,req,res,next)
```

# 미들웨어간 데이터를 전달
req.data 사용
```javascript
app.use((req,res,next)=>{
    req.data = '데이터 넣기';
    next();
},(req,res,next)={...})
```