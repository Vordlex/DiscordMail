const { RastreioBrasil } = require("correios-brasil")

const sequelize = require("../DB/config")
const UserMail = require("../DB/models/UserMails")
const formatDate = require("../handler/formatDate")

const updateChecker = async (msg) => {
  try {
    const data = await sequelize.query(
      `SELECT * FROM UserMails WHERE trackInfo LIKE '%,%';`
    )
    if (data === null) {
      return null
    }
    let hasUpdated = false

    data[0].map((x) => {
      const trackInfo = JSON.parse(x.trackInfo)
      trackInfo.map(async (y) => {
        const correios = new RastreioBrasil()
        const correiosSearch = []
        correiosSearch.push(y.code)
        const result = await correios.rastrearEncomendas(correiosSearch)
        const newDate = await formatDate(result)
        newDate > y.lastUpdate ? (hasUpdated = true) : null
      })
    })
    if (hasUpdated) {
      msg.channel.send(
        `Houve uma atualização no seu pedido! <@${msg.author.id}>`
      )
    } else {
      msg.channel.send(
        `Não houve nenhuma atualização no seu pedido, <@${msg.author.id}>`
      )
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = updateChecker
