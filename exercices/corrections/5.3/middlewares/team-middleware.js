export const validateTeam = (req, res, next) => {
  const { name, country } = req.body;
  if (req.method === "POST" && !req.body.id) {
    return res.status(400).json({
      message: "ID is required",
      success: false,
    });
  }

  // TODO mutualiser vérifs name et country dont le code est similaire
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({
      message: "name must have a value",
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

// Middleware pour vérifier que l'id est un entier
export const checkId = (req, res, next) => {
  const id = req.params.id;
  req.team = {...req.team, id }
  if (!/\d+/.test(id)) {
    res.status(400).send({ success: false, message: `${id} must be a number` });
  }
  next();
}