const mongoose = require('mongoose')

const { Schema } = mongoose

const schema = new Schema({
  username: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('User', schema)
