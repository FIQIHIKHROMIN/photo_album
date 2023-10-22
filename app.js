const express = require('express')
const app = express()
const router = require("./routes")

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(router)

module.exports = app

//authentication User sudah login atau belum
//authorization route yang diminta sesuai dengan kode/id yang dilogin atau tidak