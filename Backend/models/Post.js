const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Post extends Model {}

Post.init(
  {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4, 
        allowNull: false,
        primaryKey: true,
      },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING(1000),
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "post",
  }
);

module.exports = Post;
