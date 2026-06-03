const express = require('express')
const router = express.Router()
const postRouter = require('./postRoutes')
const authRouter = require('./authRoutes')

router.use('/post', postRouter)
router.use('/auth', authRouter)

module.exports = router