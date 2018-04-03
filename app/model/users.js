const config = require('../../config/config')
const mongoose = require('mongoose')
const db = require('./db')
const Schema = db.Schema
const dbSchema = new Schema({
    name: {
        type: String
    },
    pass: {
        type: String
    },
    age: {
        type: Number
    },
    sex: {
        type: String
    },
    phone: {
        type: String
    },
    createDate: {
        type: Number,
        default: Date.now
    }
})

module.exports = db.model('users', dbSchema, 'users')