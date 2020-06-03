const Discord = require("discord.js")
const client = new Discord.Client()

const { cmdMain } = require("./src/commands/index")

require("dotenv/config")

const token = process.env.token

try {
  client.on("ready", () => {
    cmdMain
  })
} catch (error) {
  console.log(error)
}

client.login(token)
