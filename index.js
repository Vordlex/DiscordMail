const Discord = require("discord.js")
const client = new Discord.Client()

const { cmdMain } = require("./src/commands/index")
const mongooseconfig = require("./src/DB/config")
require("dotenv/config")

const token = process.env.token

try {
  client.on("ready", () => {
    console.log("Bot Iniciado!")
    cmdMain(client)
  })
} catch (error) {
  console.log(error)
}

client.login(token)
