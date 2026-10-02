import GenericRepository from "../repositories/generic-repository.js";
import TeamModel from "../models/schemas/team-model.js";

const repo = new GenericRepository(TeamModel);

export const findAll = async (_, res) => {// _ lorsqu'un paramètre n'est pas exploité, ici req
  repo
    .findAll()
    .then((teams) => {
      res.status(200).json({ success: true, data: teams});
    })
    .catch(() => {
      res.status(500).json({ success: false, message: "Can't get teams" });
    });
};

export const findOne = (req, res) => {
  const { id } = req.params;
  // Pour récupérer aussi les joueurs de l'équipe repo.findOne(name).populate('players').then()
  repo
    .findOne({ _id : id })
    .then((team) => {
      if (team && team._id) {
        res.status(200).json({ data: team, success: true });
      } else {
        res
          .status(404)
          .json({ message: team.message ?? "Team not found", success: false });
      }
    })
    .catch(() => {
      res.status(500).json({
        success: false,
        message: `Internal server error`,
      });
    });
};

export const save = async (req, res) => {
  let { team } = req;
  // avec les players team.players = [player1._id, player2._id, ...]
  const data = await repo.save(team);
  if (data._id)
    res.status(201).json({ message: "Team created", success: true, team });
  else {
    res.status(500).json({
      message:
        "Failed to insert new team, try again or contact-us please +33612345678",
      success: false,
    });
  }
};
