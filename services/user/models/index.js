const mongoose = require('mongoose')

const mongoUrl = 'mongodb://mongo:27017/valuable-union'

const User = require('./user')
const TokenBacklist = require('./tokenBacklist')

mongoose.Promise = global.Promise
mongoose.connect(mongoUrl, {
  socketTimeoutMS: 0,
  keepAlive: true,
  reconnectTries: 30
})

module.exports = {
  User,
  TokenBacklist,
}
