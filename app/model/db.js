const config = require('../../config/config')
const mongoose = require('mongoose')
mongoose.connect(`mongodb://${config.DATABASE.USER}:${config.DATABASE.PASS}@${config.DATABASE.HOST}/${config.DATABASE.DATABASE}`)
module.exports = mongoose