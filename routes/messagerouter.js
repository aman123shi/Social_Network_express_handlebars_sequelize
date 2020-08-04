var express = require('express');
var messageController = require("../controllers/messageController");
var router = express.Router();
router.get("/", messageController.renderNewMessages);
module.exports = router;