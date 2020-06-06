const { MessageEmbed } = require("discord.js")
const { RastreioBrasil } = require("correios-brasil")
const notFoundHandler = require("../handler/notFound")

const TrackCMD = async (msg) => {
  const waitMessage = new MessageEmbed()
    .setTitle("DiscordMail")
    .setColor("#ebdd1a")
    .setDescription(`Aguarde`)
    .setAuthor(
      "DiscordMail",
      "http://www.propeg.com.br/ad-viewer/Correios/Integrada/macbook.png",
      "https://correios.com.br"
    )
  const needToDelete = await msg.channel.send(waitMessage)
  try {
    const correios = new RastreioBrasil()
    const correiosSearch = []

    const args = await msg.content.slice(1).split(" ")
    correiosSearch.push(args[1])

    const resp = await correios.rastrearEncomendas(correiosSearch)
    const field = []
    resp[0].map((v) => {
      if (v.status === "Status: Objeto encaminhado ") {
        field.push({
          name: v.status,
          value:
            v.data.replace("Data  :", "Data:") +
            "\n" +
            v.origem +
            "\n" +
            v.destino,
        })
      }
      if (
        v.status === "Status: Objeto saiu para entrega ao destinatário" ||
        v.status === "Status: Endereço incorreto - Entrega não realizada" ||
        v.status ===
          "Status: Objeto aguardando retirada no endereço indicado" ||
        v.status === "Status: Objeto entregue ao destinatário"
      ) {
        field.push({
          name: v.status,
          value: v.data.replace("Data  :", "Data:") + "\n" + v.local,
        })
      }
    })
    needToDelete.delete()
    const embed = new MessageEmbed()
      .setTitle("DiscordMail")
      .setColor("#ebdd1a")
      .setDescription(`Código de Rastreio: ${args[1]}`)
      .setAuthor(
        "DiscordMail",
        "http://www.propeg.com.br/ad-viewer/Correios/Integrada/macbook.png",
        "https://correios.com.br"
      )
      .addFields(field)
    return msg.channel.send(embed)
  } catch (error) {
    needToDelete.delete()
    return notFoundHandler(msg)
  }
}
module.exports = TrackCMD
