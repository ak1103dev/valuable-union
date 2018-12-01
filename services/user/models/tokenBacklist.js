const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema({
  token: String,
  createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('TokenBacklist', schema)
