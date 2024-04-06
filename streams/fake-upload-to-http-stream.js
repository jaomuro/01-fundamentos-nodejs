import { Readable } from "node:stream";

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

fetch("localhost:3334", {
  method: "POST",
  body: new OneToHundredeStream(),
});
