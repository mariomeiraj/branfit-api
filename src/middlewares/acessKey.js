module.exports = (req, res, next) => {
	const { api_key: key } = req.headers

	if (!key) return res.status(401).json('Chave de acesso não foi informada.')

	if (key !== process.env.API_KEY)
		return res.status(401).json('Chave de acesso inválida.')

	return next()
}
