const bcrypt = require('bcrypt')
const knex = require('../../database')
const registerBody = require('../../validations/registerBody')
module.exports = async (req, res) => {
	const { nome, cpf, email, telefone, senha } = req.body

	try {
		await registerBody.validate(req.body)

		const [user] = await knex('usuarios')
			.where('email', email)
			.orWhere('cpf', cpf)

		if (user.email === email)
			return res.status(400).json('Email já registrado.')

		if (user.cpf === cpf) return res.status(400).json('CPF já registrado.')

		const passwordEncrypted = await bcrypt.hash(senha, 12)

		await knex('usuarios').insert({
			nome,
			cpf,
			email,
			telefone,
			senha: passwordEncrypted
		})

		return res.status(201).json('Cadastrado com sucesso.')
	} catch (error) {
		return res.status(400).json(error.message)
	}
}
