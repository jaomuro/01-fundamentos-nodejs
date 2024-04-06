import http from "node:http";
import { Transform } from "node:stream";

class NegativeNumberStream extends Transform {
  _transform(chunck, encoding, callback) {
    const transformed = Number(chunck.toString()) * -1;

    callback(null, Buffer.from(transformed.toString()));
  }
}

const server = http.createServer(async (req, res) => {
  const buffers = [];

  for await (const chunck of req) {
    // conseguimos usar um await em um laço for para aguardar todas as chunks de uma req
    buffers.push(chunck);
  }

  const fullStreamContent = Buffer.concat(buffers).toString();

  console.log(fullStreamContent);

  return res.end(fullStreamContent);

  // return req.pipe(new NegativeNumberStream()).pipe(res); // transforma cada chunck da requisição e retorna como resposta
});

server.listen(3334);
