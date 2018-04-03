module.exports = {
    // ISDEV: process.argv[2] === 'dev' ? true : false,
    ISDEV: true,
    JWT: 'qy',
    PORT: 9090,
    DATABASE: {
        HOST: 'localhost:27017',
        USER: 'root',
        PASS: '123456',
        DATABASE: 'test'
    }
}