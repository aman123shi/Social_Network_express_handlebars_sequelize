const db = require("../../config/db");
module.exports.oneToOneChat = (io) => {
    var chatSocket = io.of("/message");
    chatSocket.on("connection", (socket) => {
        socket.on("seen", sender => {
            socket.join("/" + sender);
            var NewMessages = db.models.NewMessages;
            NewMessages.update({
                seen: true
            }, {
                where: {
                    uid: sender,
                    seen: false
                }
            });
            //
        });
        socket.on("message-send", (data) => {
            var Message = db.models.Messages;
            socket.join("/" + data.friendid);
            socket.broadcast.to("/" + data.friendid).emit("counter++");
            //  chatSocket
            socket.leave("/" + data.friendid);
            Message.create({
                    sender: data.sender,
                    content: data.content
                })
                .then(m => {
                    console.log(m.content + " is the content message @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
                    var NewMessages = db.models.NewMessages;
                    NewMessages.create({
                            uid: data.friendid,
                            senderid: data.sender,
                            msgid: m.id,
                            seen: false
                        })
                        .then(n => console.log(""));
                    var conversation = db.models.Conversations;
                    var u1id, u2id;
                    if (data.sender < data.friendid) {
                        u1id = data.sender;
                        u2id = data.friendid;
                    } else {
                        u1id = data.friendid;
                        u2id = data.sender;
                    }
                    conversation.create({
                            u1id: u1id,
                            u2id: u2id,
                            msgid: m.id
                        })
                        .then(c => {
                            console.log("hell ya i think i did it");
                            var user = db.models.Users;
                            user.findOne({
                                where: {
                                    id: data.sender
                                }
                            }).
                            then(u => {
                                chatSocket.emit("message-sent", {
                                    content: data.content,
                                    sender: u.name
                                });
                            });


                        });
                });

        });

    });
}