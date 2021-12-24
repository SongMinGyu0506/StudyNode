async function test_main() {
    console.log('first')
    await test1(500).then((message)=>{
        return new Promise((resolve)=>{
            console.log(message);
            resolve(message+' hello');
        });
    }).then((message2)=>{
        console.log(message2);
    });
    console.log('third');
}

function test1(sec) {
    return new Promise((resolve)=> {
        setTimeout(()=>{
            console.log('second');
            resolve('hello');
        },sec);
    });
}

test_main();
console.log("asdf");