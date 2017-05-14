const MongoClient = require('mongodb').MongoClient

function waitForMongo(mongoUrl, options, callback) {
  if (typeof (options) == 'function') {
    callback = options
    options = {}
  }

  options = options || {}
  options.timeout = options.timeout || 1000 * 60 * 2 //2 minutes
  const startTime = new Date().getTime()
  var timedOut = false

  var timeoutHandler = setTimeout(function () {
    timedOut = true
    callback(new Error('TIMEOUT_WHILE_WAITING'))
  }, options.timeout)

  connectAgain()

  function connectAgain() {
    MongoClient.connect(mongoUrl, function (err, db) {
      if (timedOut) return

      if (err) {
        console.log('wait-for-mongo: ' + err.message)
        setTimeout(connectAgain, 2000)
      } else {
        clearTimeout(timeoutHandler)
        db.close()
        const endTime = Date().getTime() - startTime
        console.log("wait-for-mongo: Waited %sms", endTime)
        callback(null, endTime)
      }
    })
  }
}

module.exports = waitForMongo
