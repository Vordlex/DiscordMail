const { MessageEmbed } = require("discord.js")

const notFound = (msg) => {
  const notFoundHandler = new MessageEmbed()
    .setTitle("DiscordMail")
    .setColor("#ebdd1a")
    .setDescription(`Código de rastreio não existente ou não encontrado.`)
    .setAuthor(
      "DiscordMail",
      "http://www.propeg.com.br/ad-viewer/Correios/Integrada/macbook.png",
      "https://correios.com.br"
    )
  msg.channel.send(notFoundHandler)
  return null
}

module.exports = notFound
