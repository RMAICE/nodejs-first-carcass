const getBase = require('../data/get-base')
const crypto = require('crypto')
const message = require('../message')
const secret = process.env.SECRET

module.exports = async function (req, res, next) {
	try {
		let db = await getBase()
		let userLogin = crypto.createHmac('sha256', secret)
							  .update(req.body.email)
							  .digest('hex')
		let user = await db.collection('users').findOne({email: userLogin})

		if (req.body.email === '' || req.body.password === '') {
			let error = message.err('signIn', 'Заполните все поля')
			return res.render('home.nj', error)
		}

		if (!!!user) {
			let error = message.err('signIn', 'Пользователь с таким логином и паролем не найден')
			return res.render('home.nj', error)
		}

		let typedPsw = crypto.createHmac('sha256', secret)
							 .update(user.salt)
							 .update(req.body.password)
							 .digest('hex')

		if (typedPsw !== user.password) {
			let error = message.err('signIn', 'Пользователь с таким логином и паролем не найден')
			return res.render('home.nj', error)
		}

		let token = crypto.createHmac('sha256', secret)
						  .update(user.email + Date.now().toString(10))
						  .digest('hex')

		await db.collection('users').updateOne(user, { $set: { token } })
		return res.cookie('auth', token).redirect('/')
	} catch (err) {
		throw err
	}
}