const db = require("../../config/db");
const fs = require("fs");

function renderProfilePage(req, res) {
    var uid = req.cookies.mysite.id;
    fs.readdir("./propics/" + uid, (error, files) => {
        console.log(files);
        res.render("profile", {
            id: uid,
            photos: files
        });

    });

}
module.exports.renderProfilePage = renderProfilePage;