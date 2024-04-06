import http from "node:http";

const users = [
  {
    id: 0,
    name: "Jhon Cruz",
    email: "jhoncruz@example.com",
  },
];

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  const buffers = [];

  for await (const chunck of req) {
    // conseguimos usar um await em um laço for para aguardar todas as chunks de uma req
    buffers.push(chunck);
  }

  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }

  if (method === "GET" && url === "/users") {
    return res
      .setHeader("Content-Type", "application/json")
      .end(JSON.stringify(users));
  }
  if (method === "POST" && url === "/users") {
    const { name, email } = req.body;

    users.push({
      id: 1,
      name: name,
      email: email,
    });

    return res.writeHead(201).end();
  }
  return res.writeHead(404).end();
});

server.listen(3333);
