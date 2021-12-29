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

# 미들웨어 안에 미들웨어를 넣는 방식
기존 미들웨어의 기능을 확장하여 사용가능
```javascript
app.use(morgan('dev'))
//or
app.use((req,res,next)=>{
    morgan('dev')(req,res,next);
});
```

```javascript
app.use((req,res,next)=>{
    if(process.env.NODE_ENV === 'production') {
        morgan('combined')(req,res,next);
    } else {
        morgan('dev')(req,res,next);
    }
});
```