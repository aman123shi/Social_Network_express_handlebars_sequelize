const config = require("./config");
const Sequelize = require("sequelize");
var sequelize = new Sequelize(config.database,
    config.username, config.password, config.params);
const path = require("path");
const fs = require("fs");
const dir = path.normalize(__dirname + "/../" + "models");
//const dir=path.join(di,"models");
var db = {
    sequelize,
    Sequelize,
    models: {}
};
fs.readdirSync(dir).forEach((file) => {
    modelDir = path.join(dir, file);
    const model = sequelize.import(modelDir);
    db.models[model.name] = model;
});

Object.keys(db.models).forEach(key => {
    if (db.models[key].associate)
        db.models[key].associate(db.models);
    if (db.models[key].associate2)
        db.models[key].associate2(db.models);
});

module.exports = db;