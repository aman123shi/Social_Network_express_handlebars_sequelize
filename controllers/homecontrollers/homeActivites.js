const db = require("../../config/db");

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
module.exports.posting = posting;