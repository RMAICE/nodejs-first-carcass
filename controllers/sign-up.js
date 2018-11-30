const getBase = require('../data/get-base')
const message = require('../message')
const crypto = require('crypto')
const validate = require('../validator')
const secret = process.env.SECRET

function generateFields(data) {
	let salt = Date.now().toString('16')
	let passHash = crypto.createHmac('sha256', secret).update(salt).update(data.password).digest('hex')
	let emailHash = crypto.createHmac('sha256', secret).update(data.email).digest('hex')

	return {
		salt,
		password: passHash,
		email: emailHash,
		refEmail: data.email,
		refPassword: data.password,
		articles: []
	}
}

async function findSameLogin (user) {
	let db = await getBase()

	return new Promise(async function(resolve, reject) {
		try {
			const userEmail = crypto.createHmac('sha256', secret).update(user.email).digest('hex')

			db.collection('users').find({email: userEmail}).toArray((err, data) => {
				resolve(data)
			})
		} catch (err) {
			reject('Заполните все поля')
		}
	})
}

module.exports = async function (req, res, next) {
	try {
		const db = await getBase()
		let foundedLogins = await findSameLogin(req.body)
		let user

		if (validate.email(req.body.email) < 0) {
			let error = message.err('signUp', 'Ошибка в поле Email')
			return res.render('home.nj', error)
		}

		if (validate.psw(req.body.password) < 0) {
			let error = message.err('signUp', 'Ошибка в поле Password')
			return res.render('home.nj', error)
		}

		if (validate.pswRepeat(req.body.password, req.body.repeatPassword)) {
			let error = message.err('signUp', 'Пароли не совпадают')
			return res.render('home.nj', error)
		}

		if (foundedLogins.length > 0) {
			let error = message.err('signUp', 'Такой Email уже существует')
			return res.render('home.nj', error)
		}

		let succes = message.succ('signUp', 'Вы успешно зарегистрированы')
		user = generateFields(req.body)
		await db.collection('users').insertOne(user)

		return res.render('home.nj', succes)
	} catch (err) {
		let error = message.err('signUp', 'Ошибка сервера')
		return res.render('home.nj', error)
	}
};