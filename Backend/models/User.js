/**
 * Import Sequelize.
 */
const sequelize = require("../config/database");
const { DataTypes, Model } = require("sequelize");
const Artist_profile = require("./Artist_profile"); 
const City = require("./City");
const Comment = require("./Comment");
const Organizer_profil = require("./Organizer_profil"); 
/**
 * Import the Sequelize instance that you have exported
 * in the config/database.js file.
 */
/**
 * Define a model that can be managed by Sequelize.
 */
class User extends Model {}
// 64 ? a voir clef 
User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4, 
      allowNull: false,
      primaryKey: true,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      validate: {
        isIn: [["admin", "artist", "moderator", "user"]],
      },
    },
    pseudo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Pass the connection instance
    modelName: "user", // Provide the name of the table
  }
);


// Méthode pour mettre à jour le rôle de l'utilisateur
User.updateUserRole = async function (userId, newRole) {
  try {
    // Récupérer l'utilisateur par ID
    const user = await this.findByPk(userId);

    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Assurez-vous que le nouveau rôle n'est pas "admin"
    if (newRole !== "admin") {
      // Mettez à jour le rôle de l'utilisateur
      await user.update({ role: newRole });
      return true; // La mise à jour a réussi
    } else {
      return false; // Le rôle "admin" ne peut pas être mis à jour
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

User.hasOne(Artist_profile, { foreignKey: 'user_id', as: 'artist_profile' });
User.hasMany(City, { foreignKey: 'user_id', as: 'city' });
User.hasMany(Comment, { foreignKey: 'user_id', as: 'comment' });
User.hasMany(Organizer_profil, { foreignKey: 'user_id', as: 'organizer_profil' });

module.exports = User;

