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
      trackInfo.map(async (y) => {
        const correios = new RastreioBrasil()
        const correiosSearch = []
        correiosSearch.push(y.code)
        const result = await correios.rastrearEncomendas(correiosSearch)
        console.log(result[0][result[0].length - 1])
      })
    })
  } catch (error) {
    console.log(error)
  }
}

module.exports = updateChecker
