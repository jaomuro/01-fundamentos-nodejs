export async function json(req, res) {
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
  res.setHeader("Content-Type", "application/json");
}
