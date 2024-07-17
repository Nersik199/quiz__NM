import express from 'express'

import controller from '../controller/taskController.js'

const router = express.Router()

router.post('/createPost', controller.createPost)
router.get('/getPost', controller.getPostList)
router.get('/single/:id', controller.getPostsId)
router.put('/single/:id', controller.updatePost)
router.delete('/single/:id', controller.deletePost)
router.get('/page', controller.getPage)
export default router
