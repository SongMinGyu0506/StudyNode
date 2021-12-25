const http = require('http');

//(req,res) : req 객체에 대한 요청 변수, res 객체에 대한 응답 정보
http.createServer((req,res)=>{
    res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'}); //응답 정보 기록
    res.write('<h1>Hello Node!</h1>'); //body 데이터
    res.end('<p>Hello Server!</p>'); // 응답 종료시 행동
}).listen(8080,()=>{
    console.log('8080 listning');
});

/*
    createServer 내부 함수에서 작동 처리 후 (req,res) 콜백함수로 전달,
    콜백 함수에서 객체 요청 및 객체 응답 처리,
    그 후 listen으로 넘겨서 해당 포트로 연결 대기
*/