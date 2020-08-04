const db = require("../../config/db");
const Op = require("sequelize").Op;
const fs = require("fs");

async function renderNotificationPage(req, res) {
    var cuid = req.cookies.mysite.id;
    var notifmodel = db.models.Notifications,
        freindsId = [];
    var freindsIdObj = await notifmodel.findAll({
        attributes: ['friendid'],
        where: {
            uid: cuid,
            seen: false
        }
    });
    for (let index = 0; index < freindsIdObj.length; index++) {
        freindsId.push(freindsIdObj[index].friendid);
    }
    // if there are any requests
    if (freindsId) {
        var users = db.models.Users;
        var usersObjArray = await users.findAll({
            attributes: ['id', 'name'],
            where: {
                id: {
                    [Op.in]: freindsId
                }
            }
        });
        var friendRequests = [];
        for (var i = 0; i < usersObjArray.length; i++) {
            friendRequests.push({
                name: usersObjArray[i].name,
                id: usersObjArray[i].id
            });
        }
        res.render("notification", {
            friendRequests: friendRequests
        });
    } else {
        // if there is no friend request
        res.render("notification", {
            friendRequests: friendRequests
        });
    }
}
module.exports.renderNotificationPage = renderNotificationPage;
module.exports.acceptRequest = acceptRequest;
async function acceptRequest(req, res) {
    var cuid = req.cookies.mysite.id;
    var friendid = req.body.friendid;
    var notifmodel = db.models.Notifications;
    var friendmodel = db.models.Friends;
    notifmodel.update({
        seen: true
    }, {
        where: {
            uid: cuid,
            friendid: friendid,
            seen: false
        }
    });
    await friendmodel.bulkCreate(
        [{
            uid: cuid,
            friendid: friendid
        }, {
            uid: friendid,
            friendid: cuid
        }]
    );
    res.send({
        success: true
    });
}