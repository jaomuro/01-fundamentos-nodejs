// process.stdin.pipe(process.stdout);
import { Readable, Writable, Transform } from "node:stream";

class OneToHundredeStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 100) {
        this.push(null);
      } else {
        const buf = Buffer.from(i.toString());
        this.push(buf);
      }
    }, 600);
  }
}

class NegativeNumber extends Transform {
  _transform(chunck, encoding, callback) {
    const transformed = Number(chunck.toString()) * -1;
    const buf = Buffer.from(transformed.toString());

    callback(null, transformed.toString());
  }
}

class MultiplyByTenStream extends Writable {
  _write(chunck, encoding, callback) {
    console.log(Number(chunck.toString()) * 10);
    callback();
  }
}

new OneToHundredeStream()
  .pipe(new NegativeNumber())
  .pipe(new MultiplyByTenStream());
