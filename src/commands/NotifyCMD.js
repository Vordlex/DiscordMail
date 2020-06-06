const { MessageEmbed } = require("discord.js")
const userModel = require("../DB/models/UserMails")
const mongoose = require("mongoose")
const { RastreioBrasil } = require("correios-brasil")

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
    console.log("data comecçou...")

    const data = await mongoose.model("UserMail")
    const sla = await data.findOne({ user_id: msg.author.id })
    console.log("data:")
    console.log(sla)
    const needToDelete = await msg.channel.send(waitMessage)
    const correios = new RastreioBrasil()

    const args = await msg.content.slice(1).split(" ")

    const correiosSearch = []
    correiosSearch.push(args[1])

    const isInvalidCode = await correios.rastrearEncomendas(correiosSearch)
    needToDelete.delete()
    if (isInvalidCode[0] === undefined) {
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

    // console.log(isInvalidCode[0])

    // if (data === null) {
    //   await UserMails.create({
    //     user_id: msg.author.id,
    //     hasNotify: [
    //       {
    //         state: true,
    //         code: args[1],
    //       },
    //     ],
    //   })
    // } else {
    // const newArray = [...data.hasNotify, { state: true, code: args[1] }]
    // }
  } catch (error) {
    console.log(error)
  }
}

module.exports = NotifyCMD
