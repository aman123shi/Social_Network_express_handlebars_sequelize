module.exports = (sequelize, DataType) => {
    const Posts = sequelize.define("Posts", {
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



        }

    );
    Posts.associate = (models) => {
        Posts.belongsTo(models.Users);
    }
    Posts.associate2 = (models) => {
        Posts.hasMany(models.Comments, {
            foreignKey: {
                name: "post_id",
                allowNull: false
            }
        });
    }
    return Posts;
}