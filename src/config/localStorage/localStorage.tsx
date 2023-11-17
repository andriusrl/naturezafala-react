import jwt from 'jsonwebtoken'

// export const token = {
//     set: token => {
//         localStorage.setItem('TOKEN', token)
//     },
//     get: () => localStorage.getItem('TOKEN'),
//     remove: () => {
//         localStorage.removeItem('TOKEN')
//     }
// }

export const user = {
    setToken: token => {
        localStorage.setItem('TOKEN', token)
    },
    setName: name => {
        localStorage.setItem('NAME', name)
    },
    getToken: () => localStorage.getItem('TOKEN'),
    getName: () => localStorage.getItem('NAME'),
    remove: () => {
        localStorage.removeItem('TOKEN')
        localStorage.removeItem('NAME')
    }
}