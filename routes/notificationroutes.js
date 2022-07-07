var express = require('express');
var notificationController = require("../controllers/notificationcontrollers/notificationindex");
var router = express.Router();
router.get("/", notificationController.renderNotificationPage);
router.post("/acceptrequest", notificationController.acceptRequest);
module.exports = router;