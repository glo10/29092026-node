const express = require("express");
const { findAll, findOne } = require("../controllers/users-controller");
const router = express.Router();

router.get("/", findAll);
// match avec GET /users/:login avec login dynamique
router.get("/:login", findOne);

module.exports = router;
