import { Sequelize, DataTypes, Model } from "sequelize";
import restoreSequelizeAttributesOnClass from "../lib/db";

class DeviceIcon extends Model {
  public id!: number;
  public url!: string | null;

  constructor(...args: any[]) {
    super(...args);
    restoreSequelizeAttributesOnClass(new.target, this);
  }
}

export = (sequelize: Sequelize) => {
  DeviceIcon.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
    },
    {
      sequelize,
      tableName: "device_icon",
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
  DeviceIcon.sync({ force: false, alter: false });
  return DeviceIcon;
};
