/**
 * Import Sequelize.
 */
const { Sequelize, DataTypes, Model } = require("sequelize");

/**
 * Import the Sequelize instance that you have exported
 * in the config/database.js file.
 */
const sequelize = require("../config/database");

/**
 * Define a model that can be managed by Sequelize.
 */
class User extends Model {}
// 64 ? a voir clef 
User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true,
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        pseudo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize, // Pass the connection instance
        modelName: "users", // Provide the name of the table
    }
);

/**
 * Export the model, so that it can be used in any
 * page to execute CRUD operations on the app_posts table.
 */
module.exports = User;