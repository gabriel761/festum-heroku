const axios = require("axios")
// exports.api = axios.create({
//     baseURL: 'https://api.ipag.com.br',
//     timeout: 3000,
//     auth: {
//         username: "festumbrasil@gmail.com",
//         password: "F043-B605F28B-77B89EF6-91CDC155-6012"
//     },
//     headers: {
//         "Content-Type": "application/json",
//         "x-api-version": 2
//     }
// })


exports.api = axios.create({
    baseURL: 'https://sandbox.ipag.com.br',
    timeout: 10000,
    auth: {
        username: "jg.7651@gmail.com",
        password: "DE86-8B29EDCB-DF1FA18B-E0061035-2F7E"
    },
    headers: {
        "Content-Type": "application/json",
        "x-api-version": 2
    }
})