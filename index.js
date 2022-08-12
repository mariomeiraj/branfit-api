require('dotenv').config()
const express = require('express')
const cors = require('cors')
const acessKey = require('./src/middlewares/acessKey')
const user = require('./src/routers/user')
const app = express()

app.use(express.json())
app.use(cors())

app.use(acessKey)

app.use('/user', user)

app.listen(process.env.PORT, () => {
	console.log(`🏃 - Server running on port: ${process.env.PORT}.`)
})
