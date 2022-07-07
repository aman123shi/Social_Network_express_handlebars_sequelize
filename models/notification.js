module.exports = (sequelize, DataType) => {
    const notifications = sequelize.define("Notifications", {
        uid: {
            type: DataType.INTEGER,
        },
        friendid: {
            type: DataType.INTEGER,

        },
        seen: {
            type: DataType.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }


    });
    return notifications;
}