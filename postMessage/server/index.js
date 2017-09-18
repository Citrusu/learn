const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
    fs.readFile('../client/gps.html', (err, data) => {
        response.writeHead(200, {'Content-type' : 'text/html'});
        response.write(data);
        response.end();
    })
}).listen(5000);

console.log(`server on localhost:5000`);