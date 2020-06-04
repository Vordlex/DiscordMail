const { MessageEmbed } = require("discord.js")
const { RastreioBrasil } = require("correios-brasil")

const TrackCMD = async (msg) => {
  try {
    const correios = new RastreioBrasil()
    const correiosSearch = []
    const prefix = "!"
    const args = await msg.content.slice(prefix.length).split(" ")
    correiosSearch.push(args[1])
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
    const embed = new MessageEmbed()
      .setTitle("DiscordMail")
      .setColor("#ebdd1a")
      .setDescription(`Código de rastreio não existente ou não encontrado.`)
      .setAuthor(
        "DiscordMail",
        "http://www.propeg.com.br/ad-viewer/Correios/Integrada/macbook.png",
        "https://correios.com.br"
      )

    return msg.channel.send(embed)
  }
}
module.exports = TrackCMD
