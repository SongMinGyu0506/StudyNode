const http = require('http');
const fs = require('fs').promises;

http.createServer(async (req,res)=>{
    try {
        //js 비동기 형식에서 파일 읽기전까진 아래 코드 실행 금지
        const data = await fs.readFile('./4/server2.html');
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'}); // header 작성
        res.end(data); // 정상 작동시 파일 읽은 거 body
    } catch(err) {
        // error
        console.error(err);
        res.writeHead(500,{'Content-Type':'text/plain; charset=utf-8'});
        res.end(err.message);
    }
}).listen(8080,()=>{
    console.log('8080 listen');
});