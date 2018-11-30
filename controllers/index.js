const article = require('./article');
// post
const signIn = require('./sign-in')
const signUp = require('./sign-up')
const logOut = require('./log-out')
// get
const profile = require('./profile')

module.exports = {
	article,
	signIn,
	signUp,
	logOut,
	profile
}