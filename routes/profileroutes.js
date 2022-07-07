var express = require('express');
var profileindex = require("../controllers/profilecontrollers/profileindex");
var router = express.Router();
router.get("/", profileindex.renderProfilePage);
router.get("/edit", profileindex.renderEditProfilePage);
module.exports = router;