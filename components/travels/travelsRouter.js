const expres = require("express");
const isAuth = require("../../middlewares/isAuth");
const router = expres.Router();
const travelsControllers = require("./travelsControllers");

router.post("/", isAuth, travelsControllers.addTravel)

module.exports = router;