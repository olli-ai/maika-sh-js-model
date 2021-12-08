import { Sequelize, DataTypes, Model } from "sequelize";
import restoreSequelizeAttributesOnClass from "../lib/db";

class Structure extends Model {
  public id!: number;
  public name!: string;
  public address!: string | null;
  public street!: string | null;
  public city!: string | null;
  public nation!: string | null;
  public maika_user_id!: number;

  constructor(...args: any[]) {
    super(...args);
    restoreSequelizeAttributesOnClass(new.target, this);
  }
}

export = (sequelize: Sequelize) => {
  Structure.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(50),
      },
      street: {
        type: DataTypes.STRING(50),
      },
      city: {
        type: DataTypes.STRING(50),
      },
      nation: {
        type: DataTypes.STRING(45),
      },
      maika_user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "maika_user",
          key: "id",
        },
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "structure",
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
  Structure.sync({ force: false, alter: false });
  return Structure;
};
