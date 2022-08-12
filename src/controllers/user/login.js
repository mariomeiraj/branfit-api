const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('../../database')

module.exports = async (req, res) => {
	const { email, senha } = req.body

	if (!email || !senha) {
		return res
			.status(400)
			.json('Você precisa inserir os campos de email e senha.')
	}

	try {
		const [user] = await knex('usuarios').where('email', email)

		if (!user) {
			return res.status(401).json('Email ou senha incorretos.')
		}

		const confirmPassword = await bcrypt.compare(senha, user.senha)
		if (!confirmPassword) {
			return res.status(401).json('Email ou senha incorreto.')
		}

		const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
			expiresIn: 604800
		})

		return res.json({ token })
	} catch (error) {
		return res.status(400).json(error.message)
	}
}
