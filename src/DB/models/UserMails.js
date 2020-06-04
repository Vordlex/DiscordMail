const { Sequelize, Model } = require("sequelize")
const sequelize = require("../config")

class UserMail extends Model {}

UserMail.init(
  {
    user_id: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false,
    },
    trackInfo: {
      type: Sequelize.JSON,
      allowNull: true,
    },
    hasNotify: {
      type: Sequelize.JSON,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "UserMail",
  }
)
module.exports = UserMail
