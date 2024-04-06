import { Readable } from "node:stream";

class OneToHundredeStream extends Readable {
  index = 1;
  _read() {
    const i = this.index++;
    setTimeout(() => {
      if (i > 5) {
        this.push(null);
      } else {
        const buf = Buffer.from(i.toString());
        this.push(buf);
      }
    }, 600);
  }
}

fetch("http://localhost:3334", {
  method: "POST",
  body: new OneToHundredeStream(),
  duplex: "half", // adicione essa linha
})
  .then((response) => {
    response.text();
  })
  .then((data) => {
    console.log(data);
  });
