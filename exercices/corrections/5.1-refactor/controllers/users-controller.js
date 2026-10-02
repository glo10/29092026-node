const { getAllUsers, getOneUser } = require("../models/user-model");

function findAll(req, res) {
  // Appeler le model
  getAllUsers()
  .then((users) => {
    // Envoyer les données recup dans le model à la vue
    res.render("users/list", { users });
  }).catch(() => {
    throw new Error('Pb serveur pour recup users')
  });
}

const findOne = async (req, res) => {
  getOneUser(req.login) // req.login a été ajoutée par le middleware 
  .then((user) => {
    res.render("users/single", { user });
  }).catch(() => {
    throw new Error(`Impossible de recup user avec le login ${login}`)
  });
};

module.exports = {
  findAll,
  findOne,
};
