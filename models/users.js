module.exports = (sequelize, DataType) => {
  const Users = sequelize.define("Users", {
      id: {
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      email: {
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        validate: {
          notEmpty: true
        }
      },
      img: {
        type: DataType.STRING
      }


    }

  );
  Users.associate = (models) => {
    Users.hasMany(models.Posts);
  }
  Users.associate = (models) => {
    Users.hasOne(models.Profile);
  }
  return Users;
}