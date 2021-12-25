const { URL } = require('url');

const myURL = new URL('http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript');
console.log('searchParams:',myURL.searchParams);
console.log('searchParams.getAll():',myURL.searchParams.getAll('category'));
console.log('searchparams.get():',myURL.searchParams.get('limit'));
console.log('searchparams.has():',myURL.searchParams.has('page'));
console.log('searchparams.keys():',myURL.searchParams.keys());
console.log('searchparams.values():',myURL.searchParams.values());

myURL.searchParams.append('filter','es3');
myURL.searchParams.append('filter','es5');
console.log(myURL.searchParams.getAll('filter'));
