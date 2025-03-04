import { Sequelize } from "sequelize";
import UserModel from "./user";
import ActionModel from "./action";
import SenmlMapModel from "./senml_map";
import PartnerUserModel from "./partner_user";
import StructureModel from "./structure";
import StructureSuggestionModel from "./structure_suggestion";
import RoomModel from "./room";
import RoomSuggestionModel from "./room_suggestion";
import DeviceModel from "./device";
import DeviceSuggestionModel from "./device_suggestion";
import DeviceTypeModel from "./device_type";
import SceneActivateCommandModel from "./device_active_command";
import SceneResponseCommandModel from "./device_response_command";
import MaikaUserModel from "./maika_user";
import DeviceIconModel from "./device_icon";

export const sequelize =
  process.env.DB_REPLICATION !== undefined &&
  String(process.env.DB_REPLICATION).toLowerCase() == "true"
    ? new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD, {
        dialect: "mysql",
        logging: false,
        define: {
          timestamps: false,
        },
        replication: {
          read: [
            {
              host: process.env.DB_HOST_SLAVE_1,
              port: process.env.DB_PORT,
              username: process.env.DB_USER!,
              password: process.env.DB_PASSWORD,
              database: process.env.DB_NAME!,
            },
          ],
          write: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            username: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME!,
          },
        },
        pool: {
          // If you want to override the options used for the read/write pool you can do so here
          max: 20,
          idle: 30000,
        },
      })
    : new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "mysql",
        logging: false,
        define: {
          timestamps: false,
        },
      });

sequelize.sync({
  force: false, // To create table if exists , so make it false
  alter: false, // To update the table if exists , so make it false
});

/* Export models Mysql */
export const User = UserModel(sequelize);
export const Action = ActionModel(sequelize);
export const SenmlMap = SenmlMapModel(sequelize);
export const PartnerUser = PartnerUserModel(sequelize);
export const Structure = StructureModel(sequelize);
export const StructureSuggestion = StructureSuggestionModel(sequelize);
export const Room = RoomModel(sequelize);
export const RoomSuggestion = RoomSuggestionModel(sequelize);
export const Device = DeviceModel(sequelize);
export const DeviceSuggestion = DeviceSuggestionModel(sequelize);
export const DeviceType = DeviceTypeModel(sequelize);
export const DeviceActivateCommand = SceneActivateCommandModel(sequelize);
export const DeviceResponseCommand = SceneResponseCommandModel(sequelize);
export const MaikaUser = MaikaUserModel(sequelize);
export const DeviceIcon = DeviceIconModel(sequelize);

/* User -> Action */
User.hasMany(Action, {
  as: "actions",
  foreignKey: "user_id",
});
Action.belongsTo(User, { as: "user", foreignKey: "user_id" });

/* Action -> PartnerUser */
Action.hasMany(PartnerUser, {
  as: "partner_users",
  foreignKey: "action_id",
});
PartnerUser.belongsTo(Action, { as: "action", foreignKey: "action_id" });

/* MaikaUser -> PartnerUser */
MaikaUser.hasMany(PartnerUser, {
  as: "partner_users",
  foreignKey: "maika_user_id",
});
PartnerUser.belongsTo(MaikaUser, { as: "maika_user", foreignKey: "maika_user_id" });

/* MaikaUser -> Structure */
MaikaUser.hasMany(Structure, {
  as: "structures",
  foreignKey: "maika_user_id",
});
Structure.belongsTo(MaikaUser, { as: "maika_user", foreignKey: "maika_user_id" });

/* Structure -> Room */
Structure.hasMany(Room, {
  as: "rooms",
  foreignKey: "structure_id",
});
Room.belongsTo(Structure, { as: "structure", foreignKey: "structure_id" });

/* Room -> Device */
Room.hasMany(Device, {
  as: "devices",
  foreignKey: "room_id",
});
Device.belongsTo(Room, { as: "room", foreignKey: "room_id" });

/* Structure -> Device */
Structure.hasMany(Device, {
  as: "devices",
  foreignKey: "structure_id",
});
Device.belongsTo(Structure, { as: "structure", foreignKey: "structure_id" });

/* PartnerUser -> Device */
PartnerUser.hasMany(Device, {
  as: "devices",
  foreignKey: "partner_user_id",
});
Device.belongsTo(PartnerUser, { as: "partner_user", foreignKey: "partner_user_id" });

/* DeviceType -> Device */
DeviceType.hasMany(Device, {
  as: "devices",
  foreignKey: "device_type_id",
});
Device.belongsTo(DeviceType, { as: "device_type", foreignKey: "device_type_id" });

/* SenmlMap <-> Device */
SenmlMap.belongsToMany(Device, {
  through: "device_senml_map",
  as: "devices",
  foreignKey: "senml_map_id",
});
Device.belongsToMany(SenmlMap, {
  through: "device_senml_map",
  as: "senml_maps",
  foreignKey: "device_id",
});

/* Device -> DeviceActivateCommand */
Device.hasMany(DeviceActivateCommand, { as: "device_activate_commands", foreignKey: "device_id" });
DeviceActivateCommand.belongsTo(Device, { as: "device", foreignKey: "device_id" });

/* Device -> DeviceResponseCommand */
Device.hasMany(DeviceResponseCommand, { as: "device_response_commands", foreignKey: "device_id" });
DeviceResponseCommand.belongsTo(Device, { as: "device", foreignKey: "device_id" });

/* DeviceIcon -> Device */
DeviceIcon.hasMany(Device, {
  as: "devices",
  foreignKey: "device_icon_id",
});
Device.belongsTo(DeviceIcon, { as: "device_icon", foreignKey: "device_icon_id" });
