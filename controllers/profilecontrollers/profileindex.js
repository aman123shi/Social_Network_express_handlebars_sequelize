const db = require("../../config/db");
const fs = require("fs");
var S = require("sequelize");
//S.Model.findByPk
async function renderProfilePage(req, res) {
    var uid = req.cookies.mysite.id;
    fs.readdir("./propics/" + uid, (error, files) => {
        console.log(files);
        res.render("profile", {
            id: uid,
            photos: files
        });

    });

}

async function renderEditProfilePage(req, res) {
    if (req.cookies.mysite) {
        let uid = req.cookies.mysite.id;
        let profilemodel = db.models.Profile;
        let profile = await profilemodel.findOne({
            where: {
                user_id: uid
            }
        });
        if (profile) {
            res.render("editprofile", {
                hometown: profile.hometown,
                school: profile.school,
                religion: profile.religion,
                relationship: profile.relationship
            });
        } else {
            res.render("editprofile", {});
        }
    }
}
module.exports.renderEditProfilePage = renderEditProfilePage;
module.exports.renderProfilePage = renderProfilePage;