const http = require('http');
const fs = require('fs');

const port = 5400;
console.log(`server is running on http://${port}`);

http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Access-control-Allow-Origin', '*');
    const main = fs.readFileSync('../data.txt');
    console.log(JSON.parse(main));
    res.end(main); 


}).listen(5400);
