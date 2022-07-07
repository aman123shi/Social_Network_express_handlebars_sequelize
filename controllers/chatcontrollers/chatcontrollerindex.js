const db = require("../../config/db");

function oneToOneChat(req, res) {
    var friendid = req.body.friendid,
        nullconv = false;
    var friendName = "Ahaduuu",
        curentUserName = "Amanu",
        currentUserid;
    var user = db.models.Users;
    user.findOne({
            where: {
                id: friendid
            }
        })
        .then(result => {
            friendName = result.name;
        });
    user.findOne({
            where: {
                email: req.cookies.mysite.email
            }
        })
        .then(result => {
            curentUserName = result.name;
            currentUserid = result.id;
        }).then(() => {
            console.log("the 1 then =============================================");

            var msgid = [],
                msgs = [];
            var u1id, u2id;
            if (currentUserid < friendid) {
                u1id = currentUserid;
                u2id = friendid;
            } else {
                u1id = friendid;
                u2id = currentUserid;
            }

            var conversation = db.models.Conversations;
            conversation.findAll({
                    where: {
                        u1id: u1id,
                        u2id: u2id
                    }
                })
                .then(result => {
                    console.log("the 2 then =============================================");
                    if (result.length > 0) {
                        console.log("conversation result present");

                        for (var i = 0; i < result.length; i++) {
                            msgid.push(result[i].msgid)
                        }
                    } else {
                        nullconv = true;
                        res.render("chat", {
                            msg: null,
                            cuid: currentUserid,
                            friendid: friendid
                        });
                        return;
                    }

                }).
            then((v) => {
                // console.log(v);
                console.log("the 3 then =============================================");
                var messages = db.models.Messages,
                    c = 0;
                for (var i = 0; i < msgid.length; i++) {
                    messages.findOne({
                            where: {
                                id: msgid[i]
                            }
                        })
                        .then(msg => {
                            if (msg) {
                                c++;
                                var m = {
                                    sender: msg.sender,
                                    content: msg.content
                                };
                                msgs.push(m);
                            } else {
                                nullconv = true
                            }
                            if (c == msgid.length) {
                                for (var i = 0; i < msgid.length; i++) {
                                    if (msgs[i].sender == currentUserid)
                                        msgs[i].sender = curentUserName;
                                    else msgs[i].sender = friendName;
                                }
                                res.render("chat", {
                                    msg: msgs,
                                    cuid: currentUserid,
                                    friendid: friendid
                                });
                            }
                        });

                }
            });
        });

}
module.exports.oneToOneChat = oneToOneChat;