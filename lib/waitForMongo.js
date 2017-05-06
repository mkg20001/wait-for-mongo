var MongoClient = require('mongodb').MongoClient
var MONGO_OPTIONS = {
  server: {
    poolSize: 1
  },
  db: {
    readPreference: 'primary'
  }
}

function waitForMongo(mongoUrl, options, callback) {
  if (typeof (options) == 'function') {
    callback = options
    options = {}
  }

  options = options || {}
  options.timeout = options.timeout || 1000 * 60 * 2 //2 minutes
  const startTime = Date.now()
  var timedOut = false

  var timeoutHandler = setTimeout(function () {
    timedOut = true
    callback(new Error('TIMEOUT_WHILE_WAITING'))
  }, options.timeout)

  connectAgain()

  function connectAgain() {
    MongoClient.connect(mongoUrl, MONGO_OPTIONS, function (err, db) {
      if (timedOut) return

      if (err) {
        console.log('wait-for-mongo: ' + err.message)
        setTimeout(connectAgain, 2000)
      } else {
        clearTimeout(timeoutHandler)
        timeoutHandler = null
        db.close()
        const endTime = new Date().now() - startTime
        console.log("wait-for-mongo: Waited %sms", endTime)
        callback(null, endTime)
      }
    })
  }
}

module.exports = waitForMongo
