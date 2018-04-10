module.exports = {
    'users': {
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
    }
}