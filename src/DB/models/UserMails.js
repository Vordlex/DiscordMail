const mongoose = require("mongoose")

const schema = new mongoose.Schema({
  user_id: "string",
  trackInfo: {
    trackCode: "string",
  },
})
const UserMail = mongoose.model("UserMail", schema)

// UserMail.init(
//   {
//     user_id: {
//       type: Sequelize.STRING,
//       primaryKey: true,
//       allowNull: false,
//     },
//     trackInfo: {
//       type: Sequelize.JSON,
//       allowNull: true,
//     },
//     hasNotify: {
//       type: Sequelize.JSON,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: "UserMail",
//   }
// )
// module.exports = UserMail
