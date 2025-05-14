import http from 'node:http';

const server = http.createServer((req, res) => {
    const {method, url} = req;

    

    return res.end("Hello World");
})

server.listen(8080);