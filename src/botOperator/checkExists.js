const UserMail = require("../DB/models/UserMails")

const checkExists = async (user_id, trackInfo) => {
  try {
    const data = await UserMail.findOne({
      where: {
        user_id,
      },
      raw: true,
    })
    if (data === null || data === undefined) {
      await UserMail.create({ user_id, trackInfo })
    } else {
      const newArray = []
      newArray.push(data.trackInfo, trackInfo)
      data.trackInfo.map(async (v) => {
        if (v.cod_rastreio !== trackInfo[0].cod_rastreio) {
          await UserMail.update({ newArray })
        }
      })
      console.log(data)
    }
  } catch (error) {
    console.log(error)
  }
}

module.exports = checkExists
