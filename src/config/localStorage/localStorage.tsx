import jwt from 'jsonwebtoken'

export const token = {
    set: token => {
        localStorage.setItem('TOKEN', token)
    },
    get: () => localStorage.getItem('TOKEN'),
    remove: () => {
        localStorage.removeItem('TOKEN')
    }
}