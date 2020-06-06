const { Schema, model, connection } = require("mongoose")

const schema = new Schema({
  user_id: "string",
  trackInfo: {
    trackCode: "string",
    trackData: [
      {
        status: "string",
        data: "string",
        origem: [Schema.Types.Mixed],
        destino: [Schema.Types.Mixed],
        local: [Schema.Types.Mixed],
      },
    ],
  },
})
const UserMail = model("UserMail", schema)

module.exports = schema
