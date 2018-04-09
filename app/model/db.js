const config = require('../../config/config')
const mongoose = require('mongoose')
const url = `mongodb://${config.DATABASE.USER}:${config.DATABASE.PASS}@${config.DATABASE.HOST}/${config.DATABASE.DATABASE}?authSource=admin`
mongoose.connect(url)
console.log(url)
mongoose.connection.on('connected', function(err) {
    if (err) console.log('Database connection failure');
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connected error ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

module.exports = mongoose