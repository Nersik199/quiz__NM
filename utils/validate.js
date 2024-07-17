function validateTitle(title) {
	let regExTitleSingle = /^[a-zA-Z][0-9]+$/
	if (title.match(regExTitleSingle)) {
		return true
	}
	if (title.length > 35) {
		return true
	}
	return false
}

function validateDisc(description) {
	let regExpDescription = /^[a-zA-Z][0-9]+$/
	if (description.match(regExpDescription)) {
		return true
	}
	if (description.length > 70) {
		return true
	} else {
		return false
	}
}

function validPage(queryPage, posts) {
	const limit = 5
	const pageList = (queryPage - 1) * limit
	const listInfoPage = posts.slice(pageList, pageList + limit)
	if (listInfoPage.length === 0) {
		return null
	}
}

export { validateTitle, validateDisc, validPage }
