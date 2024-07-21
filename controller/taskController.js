import { v4 as uuid } from 'uuid'
import { validPage, result, validate } from '../utils/validate.js'
let posts = []

async function createPost(req, res) {
	try {
		const postData = req.body
		postData.id = uuid()
		const validatedPost = await validate(postData)
		postData.taskDate = new Date()
		postData.completed = false

		if (validatedPost) {
			posts.push(validatedPost)
			console.log(posts)
			res.statusCode = 200
			res.json({ message: 'createPost successful', status: 200 })
		} else {
			res.status(404).json({ message: e.message, status: 404 })
		}
	} catch (e) {
		res.statusCode = 404
		res.json({ message: e.message, status: 404 })
	}
}

async function newPostId(req, res) {
	try {
		const postData = req.body
		const time = Date.now()

		const limitPost = postId => {
			const count = time - 24 * 60 * 60 * 1000
			return posts.filter(post => post.id === postId && post.taskDate > count)
				.length
		}

		if (limitPost(postData.id) >= 3) {
			res
				.status(500)
				.send({ message: 'your limit has been reached', status: 500 })
			return
		}

		const validatedPost = await validate(postData)
		postData.taskDate = new Date(time)
		postData.completed = false
		posts.push(validatedPost)

		console.log(posts)
		res.statusCode = 200
		res.json({ message: 'new post created', status: 200 })
	} catch (error) {
		res.statusCode = 400
		res.json({ message: error.message, status: 400 })
	}
}

async function getPostList(req, res) {
	try {
		if (posts.length === 0) {
			res.statusCode = 500
			res.send({ message: 'list not found', status: 500 })
		} else {
			let result = posts.sort((a, b) => a.taskDate - b.taskDate)
			res.statusCode = 200
			res.json({ message: 'list', status: 200, data: result })
		}
	} catch (e) {
		res.statusCode = 404
		res.json({ message: e.message, status: 404 })
	}
}

async function getPostsId(req, res) {
	try {
		console.log(req.params.id)
		let result = posts.find(item => {
			return item.id === req.params.id
		})
		if (result) {
			res.statusCode = 200
			res.json({ message: 'getPost successful', status: 200, data: result })
		} else {
			res.statusCode = 500
			res.send({ message: 'post not found', status: 500 })
		}
	} catch (e) {
		res.statusCode = 404
		res.json({ message: e.message, status: 404 })
	}
}

async function updatePost(req, res) {
	try {
		const { id, title, description, completed } = req.body
		let data = posts.findIndex(post => post.id === req.params.id)

		if (data !== -1) {
			posts[data].title = title
			posts[data].description = description
			posts[data].completed = true
			res.status(200).json({
				message: 'Post updated successfully',
				post: req.params.id,
			})
			console.log(posts)
		} else {
			res.status(500).json({ message: `Post with id ${id} not found` })
		}
	} catch (e) {
		res.status(404).json({ message: e.message, status: 404 })
	}
}

function deletePost(req, res) {
	try {
		let index = posts.findIndex(post => post.id === req.params.id)
		if (index !== -1) {
			posts.splice(index, 1)
			res.statusCode = 200
			res.json({ message: 'User deleted successfully', delId: req.params.id })
		} else {
			res.statusCode = 500
			res.send({ message: 'User not found' })
		}
	} catch (e) {
		res.statusCode = 404
		res.json({ message: e.message, status: 404 })
	}
}

function getPage(req, res) {
	try {
		const page = parseInt(req.query.page) || 1
		const pageItems = validPage(page, posts)
		if (pageItems === null) {
			res.status(500).json({ message: [], status: 500 })
		} else {
			res.status(200).json({ message: result, status: 200 })
		}
	} catch (e) {
		res.status(404).json({ message: e.message, status: 404 })
	}
}

export default {
	createPost,
	getPostList,
	getPostsId,
	updatePost,
	deletePost,
	getPage,
	newPostId,
}
