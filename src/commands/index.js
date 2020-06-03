const TrackCMD = require("./TrackCMD")
const Discord = require("discord.js")
const client = new Discord.Client()

const cmdMain = () => {
  client.on("message", (msg) => {
    try {
      switch (msg.content) {
        case "!rastreio":
          return TrackCMD(msg)
        default:
          return null
      }
    } catch (error) {
      msg.channel.send("Ocorreu algum erro inesperado!")
    }
  })
}

module.exports = { cmdMain }
