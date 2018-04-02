const express = require('express')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const router = express.Router()

// 写入log文件的stream
const logStream = fs.createWriteStream(path.join(__dirname, '../log/message/info.log'), {
    flag: 'qy'
})

// 定义log打印格式
morgan.format('qy', '[qy] :method :status :response-time :url')

router.use(morgan('qy', {
    stream: logStream
}))

router.use(function(req, res, next) {
    console.log('api 中间件 ')
    next()
})

router.get('/user/:id', function(req, res) {
    console.log('api user')
    res.send('send user')
})

exports.app = router