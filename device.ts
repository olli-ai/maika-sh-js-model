import { Sequelize, DataTypes, Model } from "sequelize";
import restoreSequelizeAttributesOnClass from "../lib/db";

class Device extends Model {
  public id!: number;
  public name!: string;
  public device_id!: string;
  public gcp_settings!: string | null;
  public aws_settings!: string | null;
  public room_id!: number;
  public device_type_id!: number;
  public partner_user_id!: number;
  public visible_level!: number | null;
  public custom_data!: string | null;
  public music_info!: string | null;
  public device_icon_id!: number | null;

  constructor(...args: any[]) {
    super(...args);
    restoreSequelizeAttributesOnClass(new.target, this);
  }
}

export = (sequelize: Sequelize) => {
  Device.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      device_id: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      gcp_settings: {
        type: DataTypes.STRING(8000),
      },
      aws_settings: {
        type: DataTypes.STRING(8000),
      },
      room_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "room",
          key: "id",
        },
      },
      device_type_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "device_type",
          key: "id",
        },
        allowNull: false,
      },
      partner_user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "partner_user",
          key: "id",
        },
        allowNull: false,
      },
      visible_level: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      custom_data: {
        type: DataTypes.STRING(800),
      },
      music_info: {
        type: DataTypes.STRING(100),
      },
      device_icon_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "device_icon",
          key: "id",
        },
      },
    },
    {
      sequelize,
      tableName: "device",
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
  Device.sync({ force: false, alter: false });
  return Device;
};
