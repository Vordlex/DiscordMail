const { Sequelize } = require("sequelize")
require("./models/UserMails")

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "DataBase",
})

module.exports = sequelize
