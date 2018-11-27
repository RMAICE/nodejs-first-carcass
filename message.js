function err(type, message) {
	return {
		[type]: {
			error: message
		}
	}
}

function succ(type, message) {
	return {
		[type]: {
			message: message
		}
	}
}

module.exports = {
	err,
	succ
}