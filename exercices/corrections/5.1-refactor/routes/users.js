const express = require("express");
const { findAll, findOne } = require("../controllers/users-controller");
const { getParamLoginMiddleware } = require("../middlewares/users-middleware");
const router = express.Router();

router.get("/", findAll);
// match avec GET /users/:login avec login dynamique
router.get("/:login", getParamLoginMiddleware,  findOne);

module.exports = router;
