import http from "node:http";
import { Transform } from "node:stream";

class NegativeNumberStream extends Transform {
  _transform(chunck, encoding, callback) {
    const transformed = Number(chunck.toString()) * -1;
    console.log(transformed);
    callback(null, Buffer.from(transformed.toString()));
  }
}

const server = http.createServer((req, res) => {
  return req.pipe(new NegativeNumberStream()).pipe(res);
});

server.listen(3334);
