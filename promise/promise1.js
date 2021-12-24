const condition = false;
const promise = new Promise((resolve,reject)=> {
    if(condition) {
        resolve('성공');
    } else {
        reject('error');
    }
});

promise.then((message)=>{
    console.log(message);
})
.catch((error)=>{
    console.error(error);
})
.finally(()=>{
    console.log('finally');
})