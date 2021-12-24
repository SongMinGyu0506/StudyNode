const condition = true;

//promise 실행 될 때 작동되는 함수?
const promise = new Promise((resolve,reject)=> {
    if(condition) {
        resolve('성공');
    } else {
        reject('error');
    }
});

promise.then((message)=>{
    return new Promise((resolve,reject)=> {
        //message는 성공
        console.log("first");
        resolve(message) //message2에 성공 넣기
    });
})
.then((message2)=> {
    console.log(message2); // 성공 출력
    return new Promise((resolve,reject)=>{
        resolve(message2); //message3에 성공 넣기
        console.log('second');
    });
})
.then((message3)=> {
    console.log(message3);
    console.log('third');
})
.catch((error)=>{
    console.log(error);
})