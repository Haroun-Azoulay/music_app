const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");


class Profil extends Model {}

Profil.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true,
    },
    music_style: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    groupe_name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    town: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    userIdd: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
  },
  {
    sequelize,
    modelName: "profil",
  }
);


module.exports = Profil;
