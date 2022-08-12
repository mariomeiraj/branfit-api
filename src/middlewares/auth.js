const jwt = require('jsonwebtoken')

module.exports = async (req, res, next) => {
	const { authorization } = req.headers

	if (!authorization) {
		return res.status(401).json('O Token não foi informado.')
	}

	const token = authorization.replace('Bearer', '').trim()

	try {
		const verifyUser = jwt.verify(token, process.env.JWT_SECRET)

		req.user = verifyUser

		return next()
	} catch (error) {
		return res.status(401).json('O token expirou, faça login novamente.')
	}
}
