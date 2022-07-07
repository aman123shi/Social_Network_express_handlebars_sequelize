var express = require('express');
var chatController = require("../controllers/chatcontrollers/chatcontrollerindex");
var router = express.Router();
router.post("/", chatController.oneToOneChat);
module.exports = router;