import express from "express";

const app = express().Router();
const docs = {
  version: "1.0.0",
  routes: [
    {
      route: "/users",
      link: `http://localhost:${PORT}/users`,
      method: "GET",
    },
    {
      route: "/users",
      link: `http://localhost:${PORT}/users`,
      method: "POST",
      body: 'JSON example { "firstname" : "D" }',
    },
    {
      route: "/users/:id",
      link: `http://localhost:${PORT}/users/:id`,
      method: "PUT",
      body: 'JSON example new data { "firstname" : "D" }',
    },
  ],
};

app.get("/", (req, res) => {
  res.status(200).json({ docs });
});

app.get("/users", (req, res) => {
  res.status(200).json({ message: "Bienvenue", data: [] });
});

app.post("/users", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    res.status(200).json({ message: "ajout ok", data });
  });
});

app.put("/users:id", (req, res) => {
  const id = req.params.id;
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });
  req.on("end", () => {
    const data = JSON.parse(body);
    res.status(200).json({ message: "modification ok", data });
  });
});

app.delete("/users:id", (req, res) => {
  const id = req.params.id;
  res.status(200).json({ message: "suppression ok" });
});

export default app;
