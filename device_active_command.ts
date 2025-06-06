import { Sequelize, DataTypes, Model } from "sequelize";
import restoreSequelizeAttributesOnClass from "../lib/db";

class DeviceActivateCommand extends Model {
  public id!: number;
  public command!: string;
  public device_id!: number;

  constructor(...args: any[]) {
    super(...args);
    restoreSequelizeAttributesOnClass(new.target, this);
  }
}

export = (sequelize: Sequelize) => {
  DeviceActivateCommand.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      command: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      device_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "device",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "device_activate_command",
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
  DeviceActivateCommand.sync({ force: false, alter: false });
  return DeviceActivateCommand;
};
