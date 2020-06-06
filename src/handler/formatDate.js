const formatDate = (isInvalidCode) => {
  let lastUpdate = isInvalidCode[0][isInvalidCode[0].length - 1].data
    .replace("Data  : ", "")
    .replace(" | Hora: ", "-")
  let day = lastUpdate.slice(0, 2)
  let month = lastUpdate.slice(3, 5)
  let year = lastUpdate.slice(6, 10)
  let hours = lastUpdate.slice(11, 16)

  lastUpdate = `${month}/${day}/${year}-${hours}`

  return lastUpdate
}

module.exports = formatDate
