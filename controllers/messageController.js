const db = require("../config/db");

function renderNewMessages(req, res) {

    var NewMessages = db.models.NewMessages;
    NewMessages.findAll({
            where: {
                uid: req.cookies.mysite.id,
                seen: false
            }
        })
        .then(result => {
            if (result.length == 0) {
                res.render("msg", {
                    friends: null,
                    noMessage: true
                });
            } else {
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
                            if (userList.indexOf(users[result[c].senderid]) < 0)

                                //  userList.indexOf
                                c++;
                            //  console.log(userList);

                            if (c == result.length) {
                                console.log(users);
                                Object.keys(users).forEach(key => {
                                    userList.push(users[key]);
                                });

                                res.render("msg", {
                                    friends: userList,
                                    noMessage: false
                                });


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

}
module.exports.renderNewMessages = renderNewMessages;