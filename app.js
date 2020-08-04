const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const db = require("./config/db");
const socketIO = require("socket.io");
const router = require("./routes/index");
const socketRouter = require("./routes/socketRoutes");
db.sequelize.sync().done(() => {
    console.log("Sequelize database  synced ")
});
const hba = require("express-handlebars").create({
    defaultLayout: 'mainTemplate',
    helpers: {
        section: function (name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
const app = express();
app.engine('handlebars', hba.engine);
app.set('view engine', 'handlebars');
app.use(express.static("public"));
app.use(express.static(__dirname + "/propics"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cookieParser("secret"));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 40000000
    }
}));
app.use(router);

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), () => {
    console.log("server stsrted on port  using nodemon " + app.get('port'));
});
var io = socketIO(server);
//passing socket io object to the router
socketRouter.socketRouter(io);