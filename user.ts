import { Sequelize, DataTypes, Model } from "sequelize";
import restoreSequelizeAttributesOnClass from "../lib/db";

class User extends Model {
  public id!: number;
  public userid!: number;
  public email!: string | null;
  public username!: string;
  public first_name!: string | null;
  public last_name!: string | null;
  public avatar_url!: string | null;
  public is_admin!: boolean | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  constructor(...args: any[]) {
    super(...args);
    restoreSequelizeAttributesOnClass(new.target, this);
  }
}

export = (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING(254),
        unique: true,
      },
      username: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      first_name: {
        type: DataTypes.STRING(100),
      },
      last_name: {
        type: DataTypes.STRING(100),
      },
      avatar_url: {
        type: DataTypes.STRING(500),
      },
      is_admin: {
        type: DataTypes.BOOLEAN,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      tableName: "users",
      // don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,

      // don't delete database entries but set the newly added attribute deletedAt
      // to the current date (when deletion was done). paranoid will only work if
      // timestamps are enabled
      paranoid: true,

      // don't use camelcase for automatically added attributes but underscore style
      // so updatedAt will be updated_at
      underscored: true,

      // disable the modification of tablenames; By default, sequelize will automatically
      // transform all passed model names (first parameter of define) into plural.
      // if you don't want that, set the following
      freezeTableName: true,
    },
  );
  User.sync({ force: false, alter: false });
  return User;
};
