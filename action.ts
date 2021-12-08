import { Sequelize, DataTypes, Model } from "sequelize";
import restoreSequelizeAttributesOnClass from "../lib/db";

class Action extends Model {
  public id!: number;
  public project_name!: string;
  public publish_name!: string | null;
  public icon_url!: string | null;
  public description!: string | null;
  public client_id!: string | null;
  public client_secret!: string | null;
  public authorization_url!: string | null;
  public token_url!: string | null;
  public fulfillment_url!: string | null;
  public scope!: string | null;
  public homegraph_key!: string | null;
  public schema!: string | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public user_id!: number | null;

  constructor(...args: any[]) {
    super(...args);
    restoreSequelizeAttributesOnClass(new.target, this);
  }
}

export = (sequelize: Sequelize) => {
  Action.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      project_name: {
        type: DataTypes.STRING(60),
        unique: true,
        allowNull: false,
      },
      publish_name: {
        type: DataTypes.STRING(100),
        unique: true,
      },
      icon_url: {
        type: DataTypes.STRING(500),
      },
      description: {
        type: DataTypes.STRING(200),
      },
      client_id: {
        type: DataTypes.STRING(500),
      },
      client_secret: {
        type: DataTypes.STRING(500),
      },
      authorization_url: {
        type: DataTypes.STRING(500),
      },
      token_url: {
        type: DataTypes.STRING(500),
      },
      fulfillment_url: {
        type: DataTypes.STRING(500),
      },
      scope: {
        type: DataTypes.STRING(500),
      },
      homegraph_key: {
        type: DataTypes.STRING(1000),
      },
      schema: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      created_at: {
        type: DataTypes.DATE,
      },
      updated_at: {
        type: DataTypes.DATE,
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "actions",
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
  Action.sync({ force: false, alter: false });
  return Action;
};
