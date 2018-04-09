const express = require('express')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const bodyParser = require('body-parser')
const router = express.Router()
const User = require('../model/users')
const Model = require('../model/model')

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

// 解决跨域问题
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

// 请求过滤
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

// 登录
router.post('/auth/login', function(req, res) {
    console.log('login', req.body)
    User.findOne({
        name: req.body.name
    }, function(err, data) {
        if (err) console.log('user find error', err)
        if (data !== null) {
            if (req.body.pass === data.pass) {
                res.status(200).json({
                    status: 200,
                    data: {
                        user: {
                            name: data.name,
                            age: data.age,
                            sex: data.sex,
                            phone: data.phone
                        },
                        token: jwt.sign({
                            id: data._id
                        }, config.JWT, {
                            expiresIn: 60 * 60 * 2
                        })
                    },
                    message: '登录成功'
                })
            } else {
                res.status(400).json({
                    status: 400,
                    message: '密码错误'
                })
            }
        } else {
            res.status(401).json({
                status: 401,
                message: '没有找到该用户'
            })
        }
    })
})

// 注册
router.post('/auth/registered', function(req, res) {
    console.log('registered', req.body)
    console.log('res --------> ', res)
    User.findOne({
        name: req.body.name
    }, function(err, data) {
        if (err) console.log('User Find Error', err)
        console.log(data)
        if (data !== null) {
            console.log('res --------> 2', res)
            res.status(400).json({
                status: 400,
                message: '此用户已经注册过了'
            })
            return
        }
        var user = new User({
            name: req.body.name,
            pass: req.body.pass,
            age: req.body.age,
            sex: req.body.sex,
            phone: req.body.phone,
        })
        user.save(function(err, data) {
            if (err) console.log('User save error ', err)
            console.log('res --------> 3', res)
            res.status(200).json({
                status: 200,
                message: '注册成功, 请登录'
            })
            return
        })
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
    console.log('data ', req.qy)
    User.findById(req.qy.id, function(err, data) {
        if (err) console.log('getUser Error ', err)
        if (data !== null) {
            res.status(200).json({
                status: 200,
                data: {
                    name: data.name,
                    age: data.age,
                    sex: data.sex,
                    phone: data.phone
                },
                message: '请求成功'
            })
            return
        } else {
            res.status(403).json({
                status: 403,
                data: {},
                message: '用户未找到'
            })
            return
        }
    })
})

exports.app = router