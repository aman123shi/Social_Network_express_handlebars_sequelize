var express = require('express');
var profileindex = require("../controllers/profilecontrollers/profileindex");
var router = express.Router();
router.get("/", profileindex.renderProfilePage);
module.exports = router;