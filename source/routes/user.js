const { Router } = require("express");

const userController = require("../controllers/user");
const authorize = require("../middlewares/authorize");
const { validateCreate, validateUpdate } = require("../validators/user");

const router = Router();

router.post("/", validateCreate, userController.createUser);
router.delete("/", authorize, userController.deleteUser);
router.get("/", authorize, userController.readUser);
router.patch("/", authorize, validateUpdate, userController.updateUser);

module.exports = router;
