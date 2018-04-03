const express = require('express')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const bodyParser = require('body-parser')
const router = express.Router()
const User = require('../model/users')

// 写入log文件的stream
const logStream = fs.createWriteStream(path.join(__dirname, '../log/message/info.log'), {
    flag: 'qy'
})

// 定义log打印格式
morgan.format('qy', '[qy] :method :status :response-time :url')

router.use(morgan('qy', {
    stream: logStream
}))

// 解析request.body的内容
router.use(bodyParser.json());
router.use(bodyParser.urlencoded());

router.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    if (req.method == "OPTIONS") {
        res.send(200)
    } else {
        next()
    }
});

router.use(function(req, res, next) {
    console.log('api 中间件 ')
    console.log('path', req.path)
    if (req.path.startsWith('/auth')) {
        next()
    } else {
        var token = req.headers['x-access-token']
        console.log('toekn ', token)
        if (token !== null && token !== '' && token !== undefined) {
            jwt.verify(token, config.JWT, (err, data) => {
                if (err) return res.status(403).json({
                    status: 403,
                    message: 'Token已过期'
                })
                req.qy = data
                next()
            })
        } else {
            return res.status(403).json({
                status: 403,
                message: '没有找到Token'
            })
        }
    }
})

router.post('/auth/login', function(req, res) {
    console.log('login', req.body)
        // var token = jwt.sign({
        //     name: '呵呵哒',
        //     age: '18',
        //     sex: '男'
        // }, config.JWT, {
        //     expiresIn: 60 * 60 * 2
        // })
    res.status(200).json({
        // token: token
    })
})

router.post('/auth/registered', function(req, res) {
    console.log('registered', req.body)
    let rr = User.findOne({
        phone: req.body.phone
    }, function(err, data) {
        if (err) console.log('User Find Error', err)
        return res.status(400).json({
            status: 400,
            message: '此手机号已经注册过了, 换一个'
        })
    })
    var user = new User({
        name: req.body.name,
        pass: req.body.pass,
        age: req.body.age,
        sex: req.body.sex,
        phone: req.body.phone,
    })
    user.save()
    console.log('user ---- >', user)
    console.log('rr ---- >', rr)
    res.status(200).json({
        status: 200,
        message: '注册成功, 请登录'
    })
})

router.post('/auth/reset', function(req, res) {
    console.log('login', req.body)
    var token = jwt.sign({
        name: '呵呵哒',
        age: '18',
        sex: '男'
    }, config.JWT, {
        expiresIn: 60 * 60 * 2
    })
    res.status(200).json({
        token: token
    })
})

router.get('/getUser', function(req, res) {
    console.log('api user')
    res.send('send user')
})

exports.app = router