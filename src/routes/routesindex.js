const express = require('express')
const router = express.Router()
const userRouter = require('./user.router')
const postRouter = require('./post.router')
const categoryRouter = require('./category.router')

//creamos ruta user , y a esta se anclan las rutas del signUp y getUsers
//localhost:3000/user
router.use('/user', userRouter)
router.use('/post', postRouter)
router.use('/category', categoryRouter)

module.exports = router;
