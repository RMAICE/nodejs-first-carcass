// post
const signIn = require('./sign-in')
const signUp = require('./sign-up')
const logOut = require('./log-out')
// get
const profile = require('./profile')

module.exports = {
	signIn,
	signUp,
	logOut,
	profile
}