var oneToOneChat = require("../controllers/socketcontrollers/oneToOneChatSocket");
var notificationSocket = require("../controllers/socketcontrollers/notificationSocket");
var profileSocket = require("../controllers/socketcontrollers/profileSocket");
module.exports.socketRouter = (io) => {
    oneToOneChat.oneToOneChat(io);
    notificationSocket.notificationSocket(io);
    profileSocket.profileSocket(io);
}