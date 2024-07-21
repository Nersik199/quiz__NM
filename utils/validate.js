import Joi from 'joi'

let result = null
async function validate(postData) {
	const validObject = Joi.object({
		id: Joi.string().uuid().required(),
		title: Joi.string().max(100).required(),
		description: Joi.string().max(500).required(),
	})
	try {
		await validObject.validateAsync(postData)
		return postData
	} catch (error) {
		console.error(error.details)
	}
}

function validPage(queryPage, posts) {
	const limit = 5
	const pageList = (queryPage - 1) * limit
	const listInfoPage = posts.slice(pageList, pageList + limit)
	if (listInfoPage.length === 0) {
		return null
	} else {
		return (result = listInfoPage)
	}
}

export { validate, validPage, result }
