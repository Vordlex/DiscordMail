const mongoose = require("mongoose")
require("dotenv/config")
const cloudpass = process.env.cloudpass
const config = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://@@cluster0.g2oh2.gcp.mongodb.net/test?retryWrites=true&w=majority",
      {
        user: "vordlex",
        pass: cloudpass,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    console.log("Foi")
  } catch (error) {
    console.log("Erro!")
  }
}

module.exports = config
