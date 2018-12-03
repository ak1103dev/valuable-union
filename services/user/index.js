const { send, receive } = require('./controller')
const User = require('./methods')

const user = new User()

receive(user)