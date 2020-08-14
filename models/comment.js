module.exports = (sequelize, DataType) => {
    const Comments = sequelize.define("Comments", {
            id: {
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            text: {
                type: DataType.STRING,
                allowNull: true
            },
            img: {
                type: DataType.STRING
            },
            like: {
                type: DataType.INTEGER

            },
            owner: {
                type: DataType.INTEGER

            }

            //
        }

    );
    Comments.associate = (models) => {
        Comments.belongsTo(models.Posts);
    }

    return Comments;
}