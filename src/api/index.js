import ajax from '../utils/fetch'

export const getUser = () => ajax.get('/getUser')

export const userLogin = (name, pass) => ajax.post('/auth/login', {
    name: name,
    pass: pass
})

export const userRegistered = (name, pass, age, sex, phone) => ajax.post('/auth/registered', {
    name: name,
    pass: pass,
    age: age,
    sex: sex,
    phone: phone,
})

export const userReset = (name, pass, phone) => ajax.post('/auth/reset', {
    name: name,
    pass: pass,
    phone: phone
})