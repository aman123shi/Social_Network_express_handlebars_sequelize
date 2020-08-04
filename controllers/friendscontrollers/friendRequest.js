const db = require("../../config/db");

function sendFriendRequest(req, res) {
    if (req.cookies.mysite) {
        if (req.cookies.mysite.logedin == true) {
            var friendid = req.body.friendid,
                cuid = req.cookies.mysite.id;
            var notif = db.models.Notifications;
            notif.create({
                    uid: friendid,
                    friendid: cuid,
                    seen: false
                })
                .then(success => {
                    if (success) {
                        res.send({
                            success: true
                        });
                    } else {
                        res.send({
                            success: false
                        });
                    }
                });
        }
    } else
        res.render("index", {
            layout: null
        });

}
module.exports.sendFriendRequest = sendFriendRequest;