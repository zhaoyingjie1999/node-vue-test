module.exports = {
    // ISDEV: process.argv[2] === 'dev' ? true : false,
    ISDEV: true,
    JWT: 'qy',
    PORT: 9090,
    DATABASE: {
        HOST: '127.0.0.1:27017',
        USER: 'root',
        PASS: '123456',
        DATABASE: 'test'
    }
}