const { RastreioBrasil } = require("correios-brasil")

const correios = new RastreioBrasil()
const codRastreio = ["PY360109365BR"]

const TrackCMD = async () => {
  try {
    const resp = await correios.rastrearEncomendas(codRastreio)
    console.log(resp[0])
  } catch (error) {
    console.log(error)
  }
}
TrackCMD()
module.export = TrackCMD
