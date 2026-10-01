import { createServer } from "node:http";
import { constants } from "node:fs";
import { findAll, save } from "./repository/user-repository.js";
import { readFile, access } from "node:fs/promises";
import { USERS_FILENAME } from "./utils/utils.js";
import { render } from "./utils/render.js";
import { routes } from "./routes/user-route.js";
import { URL } from "node:url";

const app = createServer(async (req, res) => {
  let { method, url } = req;
  let status = 200;
  // GET /
  let body = {
    message: "Documentation",
    routes
  };

  // POST /users
  if (method === "POST" && url === "/users") {
    let users = JSON.parse(await readFile(USERS_FILENAME, { encoding: "utf-8" }));
    let data = "";
    // Réception des données envoyées par le client en écoutant l'événement data
    req.on("data", (chunk) => {
      data += chunk.toString();
    });
    req.on("end", () => {
      try {
        data = JSON.parse(data);
        users.push(data);
        save(USERS_FILENAME, users);
        status = 201;
        body = { message: "user created", data };
      } catch (err) {
        status = 404;
        body = { message: `Invalid JSON data ${data}` };
      } finally {
        render(res, status, JSON.stringify(body));
      }
    });
    // GET /users & GET /users?id=
  } else if (method === "GET" && url.startsWith("/users")) {
    const myURL = new URL(`http://${req.headers.host}/${req.url}`)
    const id =  myURL.searchParams.get('id')// récupération valeur paramètre ?id=
    let users = [];
    try {
      await access(USERS_FILENAME, constants.R_OK);
    } catch (error) {
      users = await findAll();
      save(USERS_FILENAME, users);
    } finally {
      users = JSON.parse(await readFile(USERS_FILENAME, { encoding: "utf-8" }));
    }

    if (id) {
      const user = users.find((u) => parseInt(u.id) === parseInt(id));
      if (user) body = user
    } else {
      body = users;
    }
    render(res, status, JSON.stringify(body));
  } else {
    render(res, status, JSON.stringify(body));
  }
});

export default app;
