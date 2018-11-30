const getBase = require('../data/get-base')
const validate = require('../validator')
const uniqid = require('uniqid')

async function update(req, res) {
	try {
		if (!!!req.body.id)
			return res.send({ error: "Укажите id поста" })

		if (validate.isEmpty(req.body.title, req.body.text))
			return res.send({ error: "Запол" })

		let data = req.body
		let db = await getBase()
		let filter = { articles: { $elemMatch: { id: data.id } }, token: req.cookies.auth }
		let foundedArticle = !!(await db.collection('users').findOne(filter))

		if (!foundedArticle)
			return res.send({ error: "Такой пост не найден" })

		let update = { $set: { 'articles.$.title': data.title, 'articles.$.text': data.text } }

		db.collection('users').findOneAndUpdate(filter, update, (err, result) => {
			res.send('Пост изменен')
		})

	} catch (e) {
		res.render('error.nj', { e })
		throw e
	}
}

async function remove(req, res) {
	try {
		if (!!!req.body.id)
			return res.send({ error: "Укажите id поста" })

		let data = req.body
		let db = await getBase()
		let filter = { articles: { $elemMatch: { id: data.id } }, token: req.cookies.auth }
		let foundedArticle = !!(await db.collection('users').findOne(filter))

		if (!foundedArticle)
			return res.send({ error: "Такой пост не найден" })

		let update = { $pull: { articles: { id: data.id } } }

		await db.collection('users').findOneAndUpdate(filter, update)
		res.send('Пост удален')

	} catch (e) {
		res.render('error.nj', { e })
		throw e
	}
}

async function create(req, res) {
	try {
		if (validate.isEmpty(req.body.title, req.body.text))
			return res.send({ error: 'Заполните все поля' })

		let cookies = req.cookies
		let token = cookies.auth
		let db = await getBase()
		let article = {
			title: req.body.title,
			text: req.body.text,
			id: uniqid()
		}

		await db.collection('users').updateOne({ token }, { $push: { articles: article } })
		res.redirect('/')
	} catch (err) {
		throw err
	}
}

module.exports = {
	create,
	update,
	remove
}