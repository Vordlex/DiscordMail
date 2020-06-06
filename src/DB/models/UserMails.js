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
  },
  {
    sequelize,
    modelName: "UserMail",
  }
)

module.exports = UserMail
