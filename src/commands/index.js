const TrackCMD = require("./TrackCMD")
const NotifyCMD = require("./NotifyCMD")

const cmdMain = (client) => {
  client.on("message", (msg) => {
    try {
      const { content } = msg
      switch (true) {
        case content.startsWith("!rastreio"):
          return TrackCMD(msg)
        case content.startsWith("!notificar"):
          return NotifyCMD(msg)
        default:
          return null
      }
    } catch (error) {
      msg.channel.send("Ocorreu algum erro inesperado!")
    }
  })
}

module.exports = { cmdMain }
