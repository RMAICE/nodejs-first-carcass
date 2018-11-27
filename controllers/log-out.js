const getBase = require('../data/get-base')

module.exports = async function (req, res) {
	try {
		let cookies = req.cookies
		let db = await getBase()

		await db.collection('users').updateOne({ token: cookies.auth }, { $set: { token: '' } })
		res.clearCookie('auth')
		res.redirect('/')
	} catch (err) {
		res.render('error.nj')
	}
}