var express = require('express');
var router = express.Router();
var homerouter = require("./homerouter");
var chatrouter = require("./chatrouter");
var messageRouter = require("./messagerouter");
var friendsRouter = require("./friendsrouter");
var profileRouter = require("./profileroutes");
var notificationRouter = require("./notificationroutes");
router.use('/', homerouter);
router.use("/chat", chatrouter);
router.use("/messages", messageRouter);
router.use("/friends", friendsRouter);
router.use("/profile", profileRouter);
router.use("/notifications", notificationRouter);
router.get("/logout", (req, res) => {
    res.clearCookie("mysite");
    res.redirect("/");
});
module.exports = router;