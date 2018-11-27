const getdb = require('../data/db').test

module.exports = function getBase() {
	return new Promise(function(resolve, reject) {
		getdb.then((db) => {
			resolve(db)
		})
	})
}