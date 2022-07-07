let multer = require("multer");
let path = require("path");
let fs = require("fs");
let storage = multer.diskStorage({
    destination: async function (req, file, cb) {
        if (file) {
            let dir = "uploads/postpics/" + req.cookies.mysite.id;
            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir);
            }
            cb(null, dir);
        } else
            cb(null, false);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname + "-" + Date.now() + "" + path.extname(file.originalname));
    }
});
let uploadPostPhoto = multer({
    storage: storage
});
module.exports.uploadPostPhoto = uploadPostPhoto;