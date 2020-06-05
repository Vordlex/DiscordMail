const mongoose = require("mongoose")

const config = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb+srv://@@cluster0.g2oh2.gcp.mongodb.net/test?retryWrites=true&w=majority",
      {
        user: "vordlex",
        pass: "2wxQWgr5oEKO5Rmx",
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
