import express from "express";
import { dirname, resolve } from "node:path";
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
const teamsRouter = express.Router(); // Création du router
const filename = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "..",
  "data",
  "teams.json",
);
// Middleware pour vérifier que l'id est un entier
teamsRouter.param("id", (req, res, next) => {
  const id = req.params.id;
  if (!/\d+/.test(id)) {
    res.status(400).send({ success: false, message: `${id} must be a number` });
  }
  next();
});

teamsRouter.get("/", (req, res) => {
  readFile(filename)
    .then((content) => JSON.parse(content))
    .catch(() => []) // une promesse qui retourne un tableau vide
    .then((teams) => {
      res.status(200).json(teams);
    })
});

teamsRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  readFile(filename)
    .then((content) => JSON.parse(content))
    .then((teams) => {
      const team = teams.find((t) => parseInt(t.id) === parseInt(id));
      if (team) {
        res.status(200).json(team);
      }
      res.status(404).json({ message: "Team not found", success: false });
    })
    .catch(() =>
      res
        .status(500)
        .json({ success: false, message: `Can't get a team with ID ${id}` }),
    );
});

teamsRouter.post("/", async (req, res) => {
  // Attention ici au niveau sécurité c'est light, il faudrait ajouter un middleware pour vérifier les données envoyées
  const team = req.body;
  const { id, name } = team;
  if (id && name) {
    let teams = []
    try {
      teams = await readFile(filename).then((content) => JSON.parse(content.toString()))
    } catch(error) {

    }
    teams.push(team);
    writeFile(filename, JSON.stringify(teams, null, 2))
      .then(() => {
        res.status(201).json({ message: "Team created", success: true });
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "Contact-us please support@", success: false });
      });
  } else {
    res
      .status(400)
      .json({
        message: "new team should have an id and a name",
        success: false,
      });
  }
});

teamsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const {name, country} = req.body;

  if (!name || !country) {
    return res.status(400).json({
      message: "name and country required",
      success: false,
    });
  }

  try {
    const content = await readFile(filename);
    let teams = JSON.parse(content.toString());

    const index = teams.findIndex((t) => parseInt(t.id) === parseInt(id));

    if (index === -1) {
      return res.status(404).json({
        message: "Team not found",
        success: false,
      });
    }

    teams[index] = { ...teams[index], ...req.body, id: teams[index].id };

    await writeFile(filename, JSON.stringify(teams, null, 2));

    return res.status(200).json({
      message: "Team updated successfully",
      success: true,
      team: teams[index],
    });
  } catch (error) {
    return res.status(500).json({
      message: "Contact-us please support@",
      success: false,
    });
  }
});
export default teamsRouter;
