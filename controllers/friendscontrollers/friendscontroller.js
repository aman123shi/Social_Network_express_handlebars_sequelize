const db = require("../../config/db");
const Op = require("sequelize").Op;
module.exports.renderFriendsPage2 = renderFriendsPage2;

function renderFriendsPage2(req, res) {
    if (req.cookies.mysite) {
        if (req.cookies.mysite.logedin == true) {
            (async () => {
                var freindsId = [],
                    cuid = req.cookies.mysite.id;
                var frd = db.models.Friends;
                var user = db.models.Users,
                    friendsArray = [];
                var freindsIdObj = await frd.findAll({
                    attributes: ['friendid'],
                    where: {
                        uid: cuid
                    }
                });
                for (let index = 0; index < freindsIdObj.length; index++) {
                    freindsId.push(freindsIdObj[index].friendid);
                }
                console.log("PRINTING FRIENDS ARRAY IF ANY<><><><><><><><><><><><><><><><><<><><><><><><>");

                //  console.log(freindsId[0].friendid);

                if (freindsId) {
                    var friends = await user.findAll({
                        attributes: ['name', 'id'],
                        where: {
                            id: {
                                [Op.in]: freindsId
                            }
                        }
                    });
                    for (var i = 0; i < friends.length; i++) {
                        friendsArray.push({
                            name: friends[i].name,
                            id: friends[i].id
                        });
                    }
                    //111
                    res.render("friends", {
                        cuid: cuid,
                        friends: friendsArray,
                        newFriends: await generateFriendSuggestionList(freindsId, cuid)
                    });
                    //1111

                } else { //main else block   if it has no friend 

                    //generating friend suggestion list
                    res.render("friends", {
                        cuid: cuid,
                        friends: friendsArray,
                        newFriends: await generateFriendSuggestionList(freindsId, cuid)
                    });
                }

            })();
        }
    } else {
        res.render("index", {
            layout: friends
        });
    }
}
async function generateFriendSuggestionList(freindsId, cuid) {
    //generating friend suggestion list
    freindsId.push(cuid);
    var newFriendArray = [];
    var user = db.models.Users;
    var newFriendsSuggestion = await user.findAll({
        attributes: ['id', 'name'],
        where: {
            id: {
                [Op.notIn]: freindsId
            }
        }
    });
    if (newFriendsSuggestion) {
        for (let index = 0; index < newFriendsSuggestion.length; index++) {
            newFriendArray.push({
                id: newFriendsSuggestion[index].id,
                name: newFriendsSuggestion[index].name
            });
        }
        //generating friend suggestion list end

        return newFriendArray;
    } else {
        //no new friend suggestion 
        return null;
    }
}