let loggIn = false

export function login(){
    loggIn = true
}   

export function logout(){
    loggIn = false
}

export function isLoggedIn(){
    return loggIn
}