const db = require("../../config/db");
const Op = require("sequelize").Op;

function posting(req, res) {
    if (req.cookies.mysite) {
        if (req.cookies.mysite.logedin == true) {
            var post = db.models.Posts;
            var id = req.cookies.mysite.id;
            var content = req.body.text;
            post.create({
                text: content,
                img: "",
                like: 0,
                uid: id
            }).then(p => {
                console.log("the user is posted successfully " + p.id);
                res.send("you have posted succesfully");
            });

        }
    } else
        res.render("index", {
            layout: null
        });

}
async function generateNewsFeed(cuid = 1) {
    let userModel = db.models.Users;
    let postModel = db.models.Posts;
    let friendsModel = db.models.Friends,
        friendsid = [cuid],
        posts = [];
    let friendsidObj = await friendsModel.findAll({
        atrributes: 'friendid',
        where: {
            uid: cuid
        }
    });
    for (const frd of friendsidObj) {
        friendsid.push(frd.friendid);
    }
    let postObj = await postModel.findAll({
        where: {
            user_id: {
                [Op.in]: friendsid
            }
        }
    });
    let postArray = [];
    for (const p of postObj) {
        let u = await p.getUser();
        let com = await p.getComments(),
            comArray = [];
        for (const c of com) {
            let own = await userModel.findOne({
                atrributes: ['name'],
                where: {
                    id: c.owner
                }
            });
            console.log();

            let ct = {
                text: c.text,
                like: c.like,
                img: c.img,
                owner: own.name
            }


            comArray.push(ct);
        }
        let pt = {
            id: p.id,
            text: p.text,
            owner: u.name,
            like: p.like,
            img: p.img,
            comments: comArray

        };
        postArray.push(pt);
    }

}
//generateNewsFeed();
module.exports.posting = posting;