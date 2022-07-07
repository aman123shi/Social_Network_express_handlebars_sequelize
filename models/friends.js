module.exports = (sequelize, DataType) => {
    const friends = sequelize.define("Friends", {
        uid: {
            type: DataType.INTEGER,
        },
        friendid: {
            type: DataType.INTEGER,

        }


    });
    return friends;
}