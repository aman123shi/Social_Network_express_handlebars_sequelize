module.exports = (sequelize, DataType) => {
    const NewMessage = sequelize.define("NewMessages", {
        uid: {
            type: DataType.INTEGER

        },
        senderid: {
            type: DataType.INTEGER

        },
        msgid: {
            type: DataType.INTEGER
        },
        seen: {
            type: DataType.BOOLEAN,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }

    });

    return NewMessage;
}