const db = require("../../config/db");
const homeActivitiesHelper = require("./homeActivites");
async function homePage(req, res) {
    if (req.cookies.mysite) {
        if (req.cookies.mysite.logedin == true) {
            let cuid = req.cookies.mysite.id;
            res.render("home", {
                posts: await homeActivitiesHelper.generateNewsFeed(cuid),
                uid: cuid
            });
        }
    } else
        res.render("index", {
            layout: null
        });

}

function login(req, res) {
    var email = req.body.email;
    var password = req.body.password;
    var user = db.models.Users;
    user.findOne({
        where: {
            email: email
        }
    }).
    then((user) => {
        if (user) {
            var u = {
                name: user.name,
                id: user.id
            };
            res.cookie("mysite", {
                logedin: true,
                email: email,
                id: user.id
            }, {
                maxAge: 40000000000
            });
            // res.render("home", {
            //     cuid: user.id,
            //     friends: null
            // });
            res.redirect("/")
        } else {
            res.redirect("/");
        }
    }).
    catch(error => {
        console.log("database error " + error.message);
    });

}

function renderLoginPage(req, res) {
    res.render("index", {
        layout: null
    });
}

function processSignUp(req, res) {
    var name = req.body.name,
        email = req.body.email,
        password = req.body.password;
    var user = db.models.Users;
    user.create({
        name: name,
        password: password,
        email: email
    }).
    then(u => {
        if (u) {
            res.cookie("mysite", {
                logedin: true,
                email: email,
                id: u.id
            }, {
                maxAge: 40000000000
            });
            res.redirect("/");
        } else {
            //TODO: handling database errors 
        }
    });
}
module.exports.renderLoginPage = renderLoginPage;
module.exports.login = login;
module.exports.homePage = homePage;
module.exports.processSignUp = processSignUp;