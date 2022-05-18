const expres = require("express");
const router = expres.Router();
const usersControllers = require("./usersControllers");
const isAuth = require("../../middlewares/isAuth");

router.post("/signin", usersControllers.singin);
router.post("/login", usersControllers.login);
router.get("/travels", isAuth, usersControllers.getTravels)

module.exports = router;