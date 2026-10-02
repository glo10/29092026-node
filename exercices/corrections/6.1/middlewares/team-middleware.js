export const validateTeam = (req, res, next) => {
  const { name, country } = req.body;
  // TODO mutualiser vérifs name et country dont le code est similaire
  if (!name || typeof name !== "string" || name.trim() === "" || name.length < 3) {
    return res.status(400).json({
      message: "name must have a value and at least 3 chars",
      success: false,
    });
  }

  if (!country || typeof country !== "string" || country.trim() === "") {
    return res.status(400).json({
      message: "country must have a value",
      success: false,
    });
  }

  req.body.name = name.trim();
  req.body.country = country.trim();
  req.team = {...req.team, name, country }

  next();
};


// Middleware pour vérifier que l'_id de mongoDB
export const validateMongoId = (req, res, next) => {
  const id = req.params.id;
  req.team = {...req.team, _id : id }
  if (!/^6+.{23}/.test(id)) { // ou id.length === 24 && id.startsWith('6')
    res.status(400).send({ success: false, message: `${id} is wrong must have 24 chars` });
  }
  next();
}