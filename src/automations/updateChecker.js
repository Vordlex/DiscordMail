const sequelize = require("../DB/config")

const UserMail = require("../DB/models/UserMails")
const { RastreioBrasil } = require("correios-brasil")

const updateChecker = async () => {
  try {
    const data = await sequelize.query(
      `SELECT * FROM UserMails WHERE trackInfo LIKE '%,%';`
    )
    if (data === null) {
      return null
    }
    data[0].map((x) => {
      const trackInfo = JSON.parse(x.trackInfo)
      trackInfo.map((y) => {
        console.log(y)
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = updateChecker
