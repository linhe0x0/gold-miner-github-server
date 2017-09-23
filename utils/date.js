exports.now = function (fixTimezone) {
  const oDate = new Date()

  if (!fixTimezone) {
    return oDate
  }

  const offset = oDate.getTimezoneOffset() * 60 * 1000

  return new Date(oDate.getTime() - offset)
}
