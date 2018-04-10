const Promise = require('bluebird')
const config = require('../../config/config')
const dConfig = require('../../config/database.config')
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 连接mongodb
mongoose.connect(`mongodb://${config.DATABASE.USER}:${config.DATABASE.PASS}@${config.DATABASE.HOST}/${config.DATABASE.DATABASE}?authSource=admin`, function(err) {
    if (err) {
        console.log('mongodb connect error ', err)
    } else {
        console.log('mongodb connect ok')
    }
})

// 连接成功回调
mongoose.connection.on('connected', function(err) {
    if (err) console.log('Database connection failure');
});

// 错误回调
mongoose.connection.on('error', function(err) {
    console.log('Mongoose connected error ' + err);
});

// 销毁回调
mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

class Model {
    constructor() {
        this.clientList = {}
        this.tableSchema = dConfig
    }

    /**
     * 获取mongodb表连接
     * 
     * @param {String} name 表名
     * @returns {Object}
     */
    getClient(name = '') {
        if (!name) return Promise.reject('表名不能为空')
        if (this.clientList[name] !== undefined && this.clientList[name] !== null) {
            return Promise.resolve(this.clientList[name])
        } else {
            if (this.tableSchema[name] !== null && this.tableSchema[name] !== undefined) {
                let schema = new Schema(this.tableSchema[name])
                let client = mongoose.model(name, schema)
                this.clientList[name] = client
                return Promise.resolve(client)
            } else {
                return Promise.reject('请配置好数据表的Schema')
            }
        }
    }

    /**
     * 创建
     * 
     * @param {String} name 表名
     * @param {Object} ob 要创建的数据
     * @returns {Object}
     */
    create(name = '', ob = {}) {
        return this.getClient(name).then(db => {
            db.create(ob, (err, data) => {
                if (err) return Promise.reject(err)
                return Promise.resolve(data)
            })
        }).catch(message => Promise.reject(message))
    }

    /**
     * 创建多条数据
     * 
     * @param {String} name 表名
     * @param {Array} arr 要添加的数据
     * @returns {Array}
     */
    createAll(name = '', arr = []) {
        return this.getClient(name).then(db => {
            db.insertMany(arr, (err, data) => {
                if (err) return Promise.reject(err)
                return Promise.resolve(data)
            })
        }).catch(message => Promise.reject(message))
    }

    /**
     * 更新数据
     * 
     * @param {String} name 表名
     * @param {Object} where 查询要更新数据的条件
     * @param {Object} ob 要更新的数据
     * @returns {Object}
     */
    update(name = '', where = {}, ob = {}) {
        return this.getClient(name).then(db => {
            db.update(where, ob, (err, data) => {
                if (err) return Promise.reject(err)
                return Promise.resolve(data)
            })
        }).catch(message => Promise.reject(message))
    }

    /**
     * 查找数据
     * 
     * @param {String} name 表名
     * @param {Object} where 查询条件
     * @returns {Array}
     */
    find(name = '', where = {}) {
        return this.getClient(name).then(db => {
            db.find(where, (err, data) => {
                if (err) return Promise.reject(err)
                return Promise.resolve(data)
            })
        }).catch(message => Promise.reject(message))
    }

    /**
     * 查询一条数据
     * 
     * @param {String} name 表名
     * @param {Object} where 查询条件
     * @returns {Object} 
     */
    findOne(name = '', where = {}) {
        return this.getClient(name).then(db => {
            db.findOne(where, (err, data) => {
                if (err) return Promise.reject(err)
                return Promise.resolve(data)
            })
        }).catch(message => Promise.reject(message))
    }

    /**
     * 根据id查询一条数据
     * 
     * @param {String} name 表名
     * @param {Object} id id
     * @returns {Object} 
     */
    findId(name = '', id) {
        return this.getClient(name).then(db => {
            db.findById(id, (err, data) => {
                if (err) return Promise.reject(err)
                return Promise.resolve(data)
            })
        }).catch(message => Promise.reject(message))
    }

    /**
     * 删除数据
     * 
     * @param {String} name 表名
     * @param {Object} where 删除条件
     * @returns {Object}
     */
    remove(name = '', where = '') {
        return this.getClient(name).then(db => {
            db.remove(where, (err, data) => {
                if (err) return Promise.reject(err)
                return Promise.resolve(data)
            })
        }).catch(message => Promise.reject(message))
    }

    /**
     * 查询根据条件找到了多少条数据
     * 
     * @param {String} name 表名
     * @param {Object} where 查询条件
     * @returns {Number}
     */
    count(name = '', where = {}) {
        return this.getClient(name).then(db => {
            db.count(where, (err, count) => {
                if (err) return Promise.reject(err)
                return Promise.resolve(count)
            })
        }).catch(message => Promise.reject(message))
    }

    /**
     * 分页查询
     * 
     * @param {String} name 表名
     * @param {Number} size 每页多少条
     * @param {Number} number 当前多少页
     * @param {Object} where 查询条件
     * @returns {Array}
     */
    page(name = '', size = 0, number = 0, where = {}) {
        return this.getClient(name).then(db => {
            db.find(where).limit(size).skip(size * number).exec((err, data) => {
                if (err) return Promise.reject(err)
                return Promise.resolve(data)
            })
        }).catch(message => Promise.reject(message))
    }
}

module.exports = new Model()