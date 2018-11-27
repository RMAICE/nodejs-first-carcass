const MongoClient = require('mongodb').MongoClient

module.exports = {
	test: new Promise(function(resolve, reject) {
		const dbName = 'test';
		const url = 'mongodb://localhost:27017'
		const opts = { useNewUrlParser: true }

		MongoClient.connect(url, opts, function (err, client) {
			if (err)
				throw err

			let db = client.db(dbName)

			resolve(db)
		})
	})
}