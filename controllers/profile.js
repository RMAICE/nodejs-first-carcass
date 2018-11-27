module.exports = async function (req, res, next) {
	try {
		res.render('profile.nj', { posts: [] })
	} catch (err) {
		res.render('error.nj')
		throw err
	}

}