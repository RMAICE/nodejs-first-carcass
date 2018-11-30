const getBase = require('../data/get-base')

module.exports = async function (req, res, next) {
	try {
		let token = req.cookies.auth
		let db = await getBase()
		let articles = (await db.collection('users').findOne({ token }, { projection: { articles: 1 } })).articles

		res.render('profile.nj', { articles })
	} catch (err) {
		res.render('error.nj')
		throw err
	}
}