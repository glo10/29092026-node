import { readFile } from "node:fs";
import { createServer } from "node:https";
import { PUBLIC_PATH, ENV_FILE } from "./utils/paths.js";
import { join } from "node:path";
import OPTIONS from "./utils/options.js";
process.loadEnvFile(ENV_FILE);
const { PORT } = process.env;

createServer(OPTIONS, (req, res) => {
  const { url } = req;
  const filename =
    url === "/" || url === "/index.html" ? "index.html" : "404.html";
  if (url.startsWith("/css/")) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/css; charset=utf-8");
    return readFile(join(PUBLIC_PATH, url), (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader("Content-Type", "text/plain; charset=utf-8");
        return res.end("Erreur serveur rendu css", err);
      }
      res.end(data);
    });
  }

  if (url.startsWith("/img/")) {
    /**
     * const ext = path.extname(imgPath).toLowerCase();
     * const MIME_TYPES = {
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.png': 'image/png'
      };
      res.setHeader('Content-Type'), MIMES_TYPES[ext])
     */ 
    res.setHeader("Content-Type", "image/jpeg");
    return readFile(join(PUBLIC_PATH, url), (err, data) => {
      if (err) {
        res.statusCode = 404;
        return res.end("Image introuvable");
      }
      res.end(data);
    });
  }

  res.statusCode = filename.endsWith("index.html") ? 200 : 404;
  res.setHeader("Content-Type", "text/html; charset=utf-8");

  return readFile(join(PUBLIC_PATH, 'html', filename), (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      console.error("err", err);
      return res.end("Erreur serveur");
    }
    res.end(data);
  });
}).listen(PORT, () => {
  console.info(`Running On https://localhost:${PORT}`);
});
