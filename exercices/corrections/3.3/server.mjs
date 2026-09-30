import { createServer } from "node:http";

const PORT = 3300;
const contentType = { "Content-Type": "application/json; charset=utf-8" };

createServer((req, res) => {
  const { url } = req;
  const msg = url === "/" ? { message: "success" } : { message: "not found" };
  const status = url === "/" ? 200 : 404;
  res.writeHead(status, contentType);
  res.end(JSON.stringify(msg));
}).listen(PORT, () => {
  console.info(`Running on http://localhost:${PORT}`);
});
