const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  fetch("https://api.github.com/users")
    .then((res) => res.json())
    .then((users) => {
      res.render("users/list", { users });
    })
    .catch(() =>
      /**
       * On peut ici juste déclencher une erreur avec throw new Error('Aucun utilistateur')
       * Cet erreur sera interceptée par Express qui va retourner au client la page d'erreur
       * cf. implémentation suivante router.get(':login')
       */
      res.render("error", { message: "Aucun utilisateur", status: 500 }),
    );
});

// match avec GET /users/:login avec login dynamique
router.get("/:login", async (req, res) => {
  const login = req.params.login;
  const user = await fetch(`https://api.github.com/users/${login}`).then(
    (data) => data.json(),
  );
  if(user) {
    res.render("users/single", { user });
    return
  } else {
    throw new Error('login incorrect')
  }
});

module.exports = router;
