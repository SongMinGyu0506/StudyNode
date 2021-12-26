const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

//헤더의 쿠키를 객체로 치환
const parseCookies = (cookie = '') =>
    cookie
    .split(';')
    .map(v=>v.split('='))
    .reduce((acc,[k,v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    },{});


http.createServer(async (req,res)=> {
    const cookies = parseCookies(req.headers.cookie);
    //url의 시작이 /login일경우,
    if (req.url.startsWith('/login')) {
        const {query} = url.parse(req.url); // req.url의 query 추출
        const {name} = qs.parse(query); // name 추출

        // 쿠키 만료시간 설정
        const expires = new Date();
        expires.setMinutes(expires.getMinutes()+5);

        //헤더에서 쿠키 설정
        res.writeHead(302,{
            Location:'/',
            'Set-Cookie':`name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    //쿠키가 있는 경우 (쿠키가 있고 /login이 아닌경우)
    } else if(cookies.name) {
        res.writeHead(200, {'Content-Type':'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요.`);
    
    // 쿠키가 없는 경우
    } else {
        try{
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
            res.end(data);
        } catch (err) {
            res.writeHead(500, {'Content-Type':'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
})
.listen(8080,() => {
    console.log('listen 8080');
})