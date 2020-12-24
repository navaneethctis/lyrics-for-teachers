const { Router } = require("express");

const roomController = require("../controllers/room");
const authorize = require("../middlewares/authorize");
const { validateCreate, validateUpdate } = require("../validators/room");

const router = Router();

router.post("/", authorize, validateCreate, roomController.createRoom);
router.delete("/:id", authorize, roomController.deleteRoom);
router.get("/:id", authorize, roomController.readRoom);
router.patch("/:id", authorize, validateUpdate, roomController.updateRoom);

module.exports = router;
