const { string, number } = require('yup')
const yup = require('./config')

const schema = yup.object().shape({
	nome: string().required(),
	cpf: number().required(),
	email: string().email().required(),
	telefone: number().required(),
	senha: string().required().min(6)
})

module.exports = schema
