var express = require('express');
var friendscontrollers = require("../controllers/friendscontrollers/friendscontroller");
var friendRequest = require("../controllers/friendscontrollers/friendRequest");
var router = express.Router();
router.get("/", friendscontrollers.renderFriendsPage2);
router.post("/sendrequest", friendRequest.sendFriendRequest);
module.exports = router;