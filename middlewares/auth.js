const getBase = require('../data/get-base')

module.exports = async function (req, res, next) {
	try {
		let cookies = req.cookies
		let db = await getBase()
		let isLoged = await db.collection('users').findOne({token: cookies.auth})

		if (!!isLoged === false)
			return res.render('home.nj')

		next()
	} catch (err) {
		throw err
	}
}