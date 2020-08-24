const db = require("../../config/db");
const Op = require("sequelize").Op;

function posting(req, res) {
    if (req.cookies.mysite) {
        if (req.cookies.mysite.logedin == true) {
            var post = db.models.Posts;
            var id = req.cookies.mysite.id;
            var content = req.body.text;
            let filename = null;
            if (req.file)
                filename = req.file.filename || "";


            post.create({
                text: content,
                img: id + "/" + filename,
                like: 0,
                user_id: id,
            }).then(p => {
                console.log("the user is posted successfully " + p.id);
                res.redirect("/");
            });
            console.log(" the user id @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ " + id);

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
    return postArray;
}
//comment function 
async function commenting(req, res) {
    if (req.cookies.mysite) {
        console.log("the post id is---------------------------------- " + req.body.postid);
        let commentModel = db.models.Comments;
        let cuid = req.cookies.mysite.id,
            postid = req.body.postid,
            commentText = req.body.text;
        let comt = await commentModel.create({
            text: commentText,
            owner: cuid,
            post_id: postid
        });
        if (comt) {
            res.send({
                success: true,
                name: "amanuel"
            });
        } else {
            res.send({
                success: false
            });
        }

    }
}
module.exports.commenting = commenting;
module.exports.posting = posting;
module.exports.generateNewsFeed = generateNewsFeed;