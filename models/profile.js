module.exports = (sequelize, DataType) => {
    const Profile = sequelize.define("Profile", {
            id: {
                type: DataType.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            hometown: {
                type: DataType.STRING,
                allowNull: true
            },
            school: {
                type: DataType.STRING,
                allowNull: true
            },
            relationship: {
                type: DataType.STRING,
                allowNull: true
            },
            religion: {
                type: DataType.STRING,
                allowNull: true
            },
            img: {
                type: DataType.STRING
            }
        }

    );
    Profile.associate = (models) => {
        Profile.belongsTo(models.Users);
    }
    return Profile;
}