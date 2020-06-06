const Discord = require("discord.js")
const client = new Discord.Client()

const { cmdMain } = require("./src/commands/index")
const sequelize = require("./src/DB/config")

require("dotenv/config")

const token = process.env.token

// sequelize.sync({ force: true })

try {
  client.on("ready", (clientSolved) => {
    console.log("Bot Iniciado!")
    cmdMain(client)
  })
} catch (error) {
  console.log(error)
}

client.login(token)
