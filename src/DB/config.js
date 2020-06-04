const { Sequelize } = require("sequelize")

const sequelize = new Sequelize("emJyRtliSm", "emJyRtliSm", "s5xuNv9brj", {
  dialect: "mysql",
  host: "remotemysql.com",
  port: 3306,
  pool: {
    max: 10,
    min: 0,
    idle: 10000,
  },
})

module.exports = sequelize
