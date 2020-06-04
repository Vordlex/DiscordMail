const TrackCMD = require("./TrackCMD")

const cmdMain = (client) => {
  client.on("message", (msg) => {
    try {
      const { content } = msg
      switch (true) {
        case content.startsWith("!rastreio"):
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
