function email (email) {
	return email.search(/.{2,}@[a-zA-Z]+\.[a-zA-Z]{2,}/g)
}

function psw (password) {
	return password.search(/^[a-zA-Z0-9]{4,}$/g)
}

function pswRepeat (password, repeatPassword) {
	return password !== repeatPassword
}

function isEmpty(...str) {
	let result = false

	str.map(string => {
		if (string.trim().length === 0)
			result = true
	})

	return result
}

module.exports = {
	email,
	psw,
	pswRepeat,
	isEmpty
}