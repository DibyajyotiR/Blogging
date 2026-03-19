const express = require('express')
const router = express.Router()
const postRouter = require('./postRoutes')

router.use('/post', postRouter)

module.exports = router