import http from "node:http";
import { Transform } from "node:stream";

const server = http.createServer((req, res) => {
  class NegativeNumber extends Transform {
    _transform(chunck, encoding, callback) {
      const transformed = Number(chunck.toString()) * -1;
      const buf = Buffer.from(transformed.toString());

      callback(null, transformed.toString());
    }
  }
});

server.listen(3334);
