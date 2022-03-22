import { Sequelize, DataTypes, Model } from "sequelize";
import restoreSequelizeAttributesOnClass from "../lib/db";

class SenmlMap extends Model {
  public id!: number;
  public name!: string;
  public description!: string | null;
  public voice_command!: string | null;
  public gcp_command_idid!: number | null;
  public aws_command_id!: number | null;

  constructor(...args: any[]) {
    super(...args);
    restoreSequelizeAttributesOnClass(new.target, this);
  }
}

export = (sequelize: Sequelize) => {
  SenmlMap.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(60),
        unique: true,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(500),
      },
      voice_command: {
        type: DataTypes.STRING(500),
      },
      gcp_command_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "command",
          key: "id",
        },
      },
      aws_command_id: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: "senml_map",
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
  SenmlMap.sync({ force: false, alter: false });
  return SenmlMap;
};
