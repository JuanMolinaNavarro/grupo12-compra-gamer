const mysql = require("mysql2")

const connection = mysql.createConnection({
        host:'localhost',
        user:'root',
        password:'a123',
        database:'compragamerclone'
    })


module.exports = { connection }