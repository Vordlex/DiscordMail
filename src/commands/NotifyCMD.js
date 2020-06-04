const { MessageEmbed } = require("discord.js")
const { RastreioBrasil } = require("correios-brasil")
const UserMails = require("../DB/models/UserMails")

const NotifyCMD = async (msg) => {
  try {
    const correios = new RastreioBrasil()

    const data = await UserMails.findOne({
      where: {
        user_id: msg.author.id,
      },
      raw: true,
    })

    const args = await msg.content.slice(1).split(" ")
    const correiosSearch = []
    correiosSearch.push(args[1])
    const isInvalidCode = await correios.rastrearEncomendas(correiosSearch)

    if (isInvalidCode.length === undefined) {
      const embed = new MessageEmbed()
        .setTitle("DiscordMail")
        .setColor("#ebdd1a")
        .setDescription(`Código de rastreio não existente ou não encontrado.`)
        .setAuthor(
          "DiscordMail",
          "http://www.propeg.com.br/ad-viewer/Correios/Integrada/macbook.png",
          "https://correios.com.br"
        )

      msg.channel.send(embed)
      return null
    }

    if (data === null) {
      await UserMails.create({
        user_id: msg.author.id,
        hasNotify: [
          {
            state: true,
            code: args[1],
          },
        ],
      })
    } else {
      const newArray = [...data.hasNotify, { state: true, code: args[1] }]
      await UserMails.update({
        hasNotify: newArray,
      })
    }

    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

module.exports = NotifyCMD
