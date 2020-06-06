const { MessageEmbed } = require("discord.js")
const { RastreioBrasil } = require("correios-brasil")

const UserMail = require("../DB/models/UserMails")
const notFoundHandler = require("../handler/notFound")
const formatDate = require("../handler/formatDate")

const successMessageFunc = (msg) => {
  const successMessage = new MessageEmbed()
    .setTitle("DiscordMail")
    .setColor("#ebdd1a")
    .setDescription(`Notificação ativada!`)
    .setAuthor(
      "DiscordMail",
      "http://www.propeg.com.br/ad-viewer/Correios/Integrada/macbook.png",
      "https://correios.com.br"
    )
  msg.channel.send(successMessage)
}

const NotifyCMD = async (msg) => {
  try {
    const waitMessage = new MessageEmbed()
      .setTitle("DiscordMail")
      .setColor("#ebdd1a")
      .setDescription(`Aguarde`)
      .setAuthor(
        "DiscordMail",
        "http://www.propeg.com.br/ad-viewer/Correios/Integrada/macbook.png",
        "https://correios.com.br"
      )

    const data = await UserMail.findOne({
      where: {
        user_id: msg.author.id,
      },
      raw: true,
    })

    const needToDelete = await msg.channel.send(waitMessage)
    const correios = new RastreioBrasil()

    const args = await msg.content.slice(1).split(" ")

    const correiosSearch = []
    correiosSearch.push(args[1])

    const isInvalidCode = await correios.rastrearEncomendas(correiosSearch)
    needToDelete.delete()
    if (isInvalidCode[0] === undefined) {
      return notFoundHandler(msg)
    } else if (data === null) {
      const lastUpdate = formatDate(isInvalidCode)

      UserMail.create({
        user_id: msg.author.id,
        trackInfo: [
          {
            code: args[1],
            lastUpdate,
          },
        ],
      })
      return successMessageFunc(msg)
    } else {
      const pushData = JSON.parse(data.trackInfo)

      let existCheck = false

      pushData.map(async (v) => {
        v.code === args[1] ? (existCheck = true) : null
      })
      if (existCheck) {
        const alreadyExists = new MessageEmbed()
          .setTitle("DiscordMail")
          .setColor("#ebdd1a")
          .setDescription(`Esse código já está lhe enviando notificações`)
          .setAuthor(
            "DiscordMail",
            "http://www.propeg.com.br/ad-viewer/Correios/Integrada/macbook.png",
            "https://correios.com.br"
          )
        return msg.channel.send(alreadyExists)
      } else if (!existCheck) {
        const lastUpdate = formatDate(isInvalidCode)
        pushData.push({ code: args[1], lastUpdate })
        await UserMail.update(
          {
            trackInfo: pushData,
          },
          {
            where: {
              user_id: msg.author.id,
            },
          }
        )
        console.log("veio aqui")
        return successMessageFunc(msg)
      }
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = NotifyCMD
