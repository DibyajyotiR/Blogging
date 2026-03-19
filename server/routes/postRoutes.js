const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')

router.use('/create', postController.createPost)
router.use('/get', postController.getPosts)
router.use('/getById/:id', postController.getPostById)
router.use('/update/:id', postController.updatePost)
router.use('/delete/:id', postController.deletePost)

module.exports = router