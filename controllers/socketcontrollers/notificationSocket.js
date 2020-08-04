const db = require("../../config/db");
// const express = require("express");
// var serv= express();
// const io= require("socket.io")(serv)
const cookie = require("cookie");
module.exports.notificationSocket = (io) => {
    var notifSocket = io.of("/notification");
    notifSocket.on("connection", (socket) => {
        //    var c = require("cookie-parser").JSONCookie();
        var c = cookie.parse(socket.handshake.headers.cookie).mysite;
        var st = c.slice(2);
        var cc = JSON.parse(st);
        console.log("cookies from socket " + socket.handshake.headers.cookie);
        console.log(cc.email + " str js");

        socket.emit("connection");
        console.log("conection created =========");

        socket.on("notify", (data) => {
            console.log("notify created =========");
            var NewMessages = db.models.NewMessages;
            NewMessages.findAll({
                    where: {
                        uid: data,
                        seen: false
                    }
                })
                .then(result => {
                    if (result.length == 0)
                        socket.emit("newMessages", 0);
                    else {
                        var users = {},
                            userList = []
                        c = 0;
                        var user = db.models.Users;
                        for (var i = 0; i < result.length; i++) {
                            if (!(users[result[i].senderid])) {
                                console.log(!(users[result[i].senderid]) + " does the value exist");

                                user.findOne({
                                    where: {
                                        id: result[i].senderid
                                    }
                                }).
                                then(u => {

                                    users[result[c].senderid] = {
                                        id: u.id,
                                        name: u.name,
                                        count: 1
                                    };
                                    //   userList.push(users[result[c].senderid])
                                    c++;
                                    //  console.log(userList);

                                    if (c == result.length) {


                                        socket.emit("newMessages", result.length);

                                    }

                                });
                            } else {
                                c++;
                                users[result[i].senderid].count += 1;
                                console.log("increamenting the counter" + users[result[i].senderid].count);

                            }


                        }
                    }

                });
        });




    });

}