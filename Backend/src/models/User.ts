import { Request } from 'express';
import { DataTypes, Model } from "sequelize";
import sequelizeConnection from "../../config/database";
import City from "./City";
import OrganizerProfil from "./OrganizerProfil";
import ArtistProfil from "./ArtistsProfil";

export type UserAttributes = {
  id?: string;
  lastname: string;
  firstname: string;
  password: string;
  email: string;
  role: string;
  pseudo: string;
}

class User extends Model<UserAttributes> {
  public id?: string;
  public lastname!: string;
  public firstname!: string;
  public password!: string;
  public email!: string;
  public role!: string;
  public pseudo!: string;

  // Static method
  public static updateUserRole = async (
    userId: string,
    newRole: string
  ): Promise<boolean> => {
    try {
      const user = await this.findByPk(userId);
      if (!user) {
        throw new Error("Utilisateur non trouvé");
      }
      if (newRole !== "admin") {
        await user.update({ role: newRole });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
}

export interface UserRequest extends Request {
  user?: UserAttributes
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
      validate: {
        isEmail: true,
      }
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
    sequelize: sequelizeConnection,
    modelName: "user",
  }
);

// User.hasOne(ArtistProfil, { foreignKey: 'user_id', as: 'artist_profile' });
// User.hasMany(City, { foreignKey: 'user_id', as: 'city' });
//User.hasMany(Comment, { foreignKey: 'user_id', as: 'comment' });
// User.hasMany(OrganizerProfil, { foreignKey: 'user_id', as: 'organizer_profil' });

export default User;
