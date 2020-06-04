const { MessageEmbed } = require("discord.js")
const UserMails = require("../DB/models/UserMails")

const NotifyCMD = async (msg) => {
  try {
    const data = await UserMails.findOne({
      where: {
        user_id,
      },
    })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

module.exports = NotifyCMD
