const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
Joi.objectId = require('joi-objectid')(Joi)

const { User } = require('../../models');
const salt = 10

module.exports = function() {
  generatePassword = (password) => {
    return bcrypt.hashSync(password, salt);
  }

  comparePassword = (password, hashPassword) => {
    return bcrypt.compareSync(password, hashPassword)
  }

  existedUser = async (email) => {
    const user = await User.findOne({ email })
    return !!user
  }

  register = async (params) => {
    const bodySchema = {
      username: Joi.string().lowercase().trim().required(),
      email: Joi.string().lowercase().trim().email().required(),
      password: Joi.string().required(),
    }
    const { error, value } = Joi.validate(params, bodySchema, { abortEarly: false })
    if (error) {
      return Promise.reject({ code: 400, message: 'INVALID_DATA', error })
    }
    const { username, email, password } = value
    const isExisted = await this.existedUser(email)
    if (isExisted) {
      return Promise.reject({ code: 400, message: 'EMAIL_ALREADY_EXIST' })
    }
    const newUser = await new User({
      email,
      username,
      password: this.generatePassword(password),
    })
    return newUser
  }

  login = async (params) => {
    const bodySchema = {
      email: Joi.string().lowercase().trim().email().required(),
      password: Joi.string().required(),
    }
    const { error, value } = Joi.validate(params, bodySchema, { abortEarly: false })
    if (error) {
      return Promise.reject({ code: 400, message: 'INVALID_DATA', error })
    }
    const { password } = value
    const user = await User.findOne({ email })
    if (!user) {
      return Promise.reject({ code: 401, message: 'WRONG_EMAIL_PASSWORD' })
    }
    const validPassword = this.comparePassword(password, user.password)
    if (!validPassword) {
      return Promise.reject({ code: 401, message: 'WRONG_EMAIL_PASSWORD' })
    }
    const token = jwt.sign({
      _id: user._id,
      email: user.email,
      username: user.username,
    }, 'TOKEN')
    return { token }
  }

  getUser = (params) => {
    const bodySchema = {
      userId: Joi.objectId().required(),
    }
    const { error, value } = Joi.validate(params, bodySchema, { abortEarly: false })
    if (error) {
      return Promise.reject({ code: 400, message: 'INVALID_DATA', error })
    }
    const { userId } = value
    const user = await findById(userId)
    return user
  }
}
