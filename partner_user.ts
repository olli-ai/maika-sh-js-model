import { Sequelize, DataTypes, Model } from "sequelize";
import restoreSequelizeAttributesOnClass from "../lib/db";

class PartnerUser extends Model {
  public id!: number;
  public status!: string | null;
  public agent_user_id!: string | null;
  public code!: string | null;
  public platform_url!: string | null;
  public token_type!: string | null;
  public access_token!: string | null;
  public refresh_token!: string | null;
  public action_id!: number | null;
  public maika_user_id!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;

  constructor(...args: any[]) {
    super(...args);
    restoreSequelizeAttributesOnClass(new.target, this);
  }
}

export = (sequelize: Sequelize) => {
  PartnerUser.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      status: {
        type: DataTypes.INTEGER,
      },
      agent_user_id: {
        type: DataTypes.STRING(500),
      },
      code: {
        type: DataTypes.STRING(500),
        unique: true,
      },
      platform_url: {
        type: DataTypes.STRING(1000),
      },
      token_type: {
        type: DataTypes.STRING(30),
      },
      access_token: {
        type: DataTypes.STRING(5000),
      },
      refresh_token: {
        type: DataTypes.STRING(5000),
      },
      action_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "actions",
          key: "id",
        },
      },
      maika_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "maika_user",
          key: "id",
        },
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
      tableName: "partner_user",
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
  PartnerUser.sync({ force: false, alter: false });
  return PartnerUser;
};
