const http = require('http');
const fs = require('fs').promises;

const users = {}; // DB 대체

http.createServer(async (req,res)=>{
    try{
        console.log(req.method,req.url); // ex) GET /

        //GET ==> 해당 코드에서는 페이지 이동
        if(req.method === 'GET') {
            if(req.url === '/') {
                const data = await fs.readFile('./4/restFront.html');
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                return res.end(data); //data 출력 후 종료
            } else if (req.url ==='/about') {
                const data = await fs.readFile('./4/about.html');
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                return res.end(data);
            } else if (req.url === '/users') {
                res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
                return res.end(JSON.stringify(users));
            }
            try {
                const data = await fs.readFile(`.${req.url}`);
                return res.end(data);
            } catch (err) {
                console.error(err)
            }
        //POST 데이터 입력시 사용
        } else if (req.method === 'POST') {
            if (req.url === '/user') {
                let body = '';

                //본문에 들어있는 데이터를 꺼내는 작업
                req.on('data',(data)=> {
                    body += data;
                    console.log(body);
                });

                //종료할 때 users에 저장
                return req.on('end', ()=>{
                    console.log('POST 본문(Body):',body);
                    const { name } = JSON.parse(body);
                    const id = Date.now();
                    users[id] = name;
                    res.writeHead(201);
                    res.end('등록 성공');
                });
            }
        } 
        else if (req.method === 'PUT') {
            if(req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2]; //user/ 이후 내용, URL에 출력된 키 값은 restFront.js에서 Object.keys()로 생성
                let body = '';
                req.on('data',(data)=>{
                    body+=data;
                });
                return req.on('end',()=>{
                    console.log('PUT 본문(body):',body);
                    users[key] = JSON.parse(body).name; //DB 대체 딕셔너리?에 name 수정
                    return res.end(JSON.stringify(users)); //다시 JSON 변환 후 종료
                });
            }
        } else if (req.method === 'DELETE') {
            if(req.url.startsWith('/user/')) {
                const key = req.url.split('/')[2];
                delete users[key]; //해당 key 값의 데이터 삭제
                return res.end(JSON.stringify(users));
            }
        }
        res.writeHead(404);
        return res.end('NOT FOUND');
    } catch  (err) {
        console.error(err);
        res.writeHead(500,{'Content-Type':'text/html; charset=utf-8'});
        res.end(err.message);
    }
})
.listen(8080,()=>{
    console.log('listen 8080');
})