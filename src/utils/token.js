const TOKEN = 'APP_TOKEN'

export function getToken() {
    if (sessionStorage.getItem(TOKEN) !== null) return sessionStorage.getItem(TOKEN)
    return ''
}

export function setToken(token) {
    return sessionStorage.setItem(TOKEN, token)
}

export function isToken() {
    if (getToken() !== '') return true
    return false
}

export function clearToken() {
    return sessionStorage.clear()
}