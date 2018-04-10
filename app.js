const express = require('express')
const path = require('path')
const fs = require('fs')
const opn = require('opn')
const webpack = require('webpack')
const devMiddleware = require('webpack-dev-middleware')
const hotMiddleware = require('webpack-hot-middleware')
const history = require('connect-history-api-fallback')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const webpackConfig = require('./config/webpack.config.js')
const router = require('./app/router/index').app
const app = express()
const logStream = fs.createWriteStream(path.join(__dirname, './app/log/message/info.log'), { flag: 'qy' })
const config = require('./config/config.js')
const server = require('http').createServer(app)
const io = require('socket.io')(server)

// 设置api接口
app.use('/api', router)

// 解决vue-router的history模式问题
app.use(history({
    rewrites: [{
        from: /^\/index/,
        to: '/'
    }]
}))

app.use('/', express.static('./src/assert'))
    // 解析request.body的内容
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
morgan.format('qy', '[qy] :method :status :response-time :url')

app.use(morgan('qy', {
    stream: logStream
}))

app.all('*', function(req, res, next) {
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

// webpack启动
const compiler = webpack(webpackConfig)

// webpack watch启动
// const watching = compiler.watch({
//     index: 'index.html',
//     aggregateTimeout: 300,
//     // 自动监听不管用尝试使用这个
//     // poll: 1000
// }, function(err, status) {
//     // console.log(status.toString({
//     //     colors: true
//     // }))
//     if (err) console.log('webpack 出错啦')
// })

if (config.ISDEV) {
    app.use(devMiddleware(compiler, {
        hot: true,
        publicPath: '/',
        quiet: true
    }))
    app.use(hotMiddleware(compiler, {
        path: '/__webpack_hmr'
    }))
}

app.get('/', function(req, res) {
    res.render('./index.html')
})

app.use(function(req, res, next) {
    console.log('执行了中间件1 ')
    next()
})

app.use(function(err, req, res, next) {
    console.log('error 中间件 ', err)
    res.send('error')
})

io.on('connection', function(socket) {
    let n = 0
    setInterval(function() {
        socket.emit('test', {
            message: 'test' + n
        })
        n += 1
    }, 10000)
    socket.on('test', function(data) {
        console.log('socket on test ', data)
        socket.emit('test', {
            message: 'test'
        })

    })
})

server.listen(config.PORT, function(err) {
    let url = `http://localhost:${config.PORT}`
    console.log('服务启动完成', url)
        // opn(url)
})