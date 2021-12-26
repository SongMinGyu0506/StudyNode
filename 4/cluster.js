const cluster = require('cluster');
const http = require('http');
const numCPUs = require('os').cpus().length;

// 최초실행 (부모 프로세스인 경우,)
if (cluster.isMaster) {
    console.log(`Master Process ID:${process.pid}`)
    //CPU의 개수만큼 워커 생산
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    //워커의 명령어가 exit 일 경우 exit 처리 후 콜백 함수 실행
    cluster.on('exit',(worker,code,signal)=>{
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        console.log('code',code,'signal',signal);
        cluster.fork();
    });

// 워커인 경우 (자식 프로세스)
} else {
    http.createServer((req,res)=>{
        res.writeHead(200,{'Content-Type':'text/html; charset=utf-8'});
        res.write('<h1>Hello Node!</h1>');
        res.end('<p>Hello Cluster!</p>');
        setTimeout(()=>{
            process.exit(1);
        },1000);
    }).listen(8080);

    console.log(`${process.pid}번 워커 실행`);
}