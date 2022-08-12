const express = require('express')
const listUser = require('../controllers/user/listUser')
const login = require('../controllers/user/login')
const register = require('../controllers/user/register')
const auth = require('../middlewares/auth')

const routes = express()

routes.post('/login', login)
routes.post('/register', register)

routes.use(auth)

routes.post('/:id', listUser)

module.exports = routes
