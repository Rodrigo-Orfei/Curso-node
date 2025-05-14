import http from "node:http";
import { Transform } from 'node:stream'

class InvertNumberStream extends Transform {
    _transform(chunk, encoding, callback) {
        const transformed = Number(chunk.toString()) * -1
        
        console.log(transformed)

        callback(null, Buffer.from(String(transformed)))
    }
}

// req -> readableStream
// res -> writableStream

const server = http.createServer((req,res) => {
    return req
        .pipe(new InvertNumberStream())
        .pipe(res)
})

server.listen(8081);