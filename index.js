const Discord = require("discord.js")
const client = new Discord.Client()

const { cmdMain } = require("./src/commands/index")
const sequelize = require("./src/DB/config")
const updateChecker = require("./src/automations/updateChecker")

require("dotenv/config")

const token = process.env.token

// sequelize.sync({ force: true })

try {
  client.on("ready", () => {
    console.log("Bot Iniciado!")
    cmdMain(client)
    updateChecker()
  })
} catch (error) {
  console.log(error)
}

client.login(token)
