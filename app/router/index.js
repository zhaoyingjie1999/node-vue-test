const express = require('express')
const fs = require('fs')
const path = require('path')
const morgan = require('morgan')
const jwt = require('jsonwebtoken')
const config = require('../../config/config')
const bodyParser = require('body-parser')
const router = express.Router()
    // const User = require('../model/users')
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
    Model.findOne('users', {
        name: req.body.name
    }).then(data => {
        console.log('查找完成', data)
        if (data !== null && data !== undefined) {
            if (req.body.pass === data.pass) {
                console.log('登陆成功')
                return res.status(200).json({
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
                console.log('密码错误')
                return res.status(400).json({
                    status: 400,
                    message: '密码错误'
                })
            }
        } else {
            console.log('没找到用户')
            return res.status(403).json({
                status: 403,
                message: '没有找到该用户'
            })
        }
    })
})

// 注册
router.post('/auth/registered', function(req, res) {
    Model.findOne('users', {
        name: req.body.name
    }).then(data => {
        console.log('zhuce, ', data)
        if (data !== null && data !== undefined) {
            return res.status(400).json({
                status: 400,
                message: '此用户已经注册过了'
            })
        }
        Model.create('users', {
            name: req.body.name,
            pass: req.body.pass,
            age: req.body.age,
            sex: req.body.sex,
            phone: req.body.phone,
        }).then(addRes => {
            return res.status(200).json({
                status: 200,
                message: '注册成功, 请登录'
            })
        })
    })
})

router.post('/auth/reset', function(req, res) {
    console.log('login', req.body)
    Model.findOne('users', {
        name: req.body.name
    }).then(data => {
        if (data !== null && data !== undefined) {
            Model.update('users', {
                phone: req.body.phone
            }, {
                pass: req.body.pass
            }).then(udata => {
                return res.status(200).json({
                    status: 200,
                    message: '重置成功, 请重新登录'
                })
            })
        } else {
            return res.status(403).json({
                status: 403,
                message: '没有找到该用户'
            })
        }
    })
})

router.get('/getUser', function(req, res) {
    Model.findId('users', req.qy.id).then(data => {
        if (data !== null && data !== undefined) {
            return res.status(200).json({
                status: 200,
                data: {
                    name: data.name,
                    age: data.age,
                    sex: data.sex,
                    phone: data.phone
                },
                message: '请求成功'
            })
        } else {
            return res.status(403).json({
                status: 403,
                data: {},
                message: '用户未找到'
            })
        }
    })
})

exports.app = router