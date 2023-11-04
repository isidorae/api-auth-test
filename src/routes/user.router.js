const express = require('express')
const router = express.Router()
const {signUp, getUsers, deleteUser, updateUser, login } = require('../controllers/user.controller')
const auth = require('../middlewares/auth')
//ruta post asociada a la lógica de cada método
router.post('/signup', signUp)
//ruta post porque se enviara info en un body;
router.post('/login', login)
router.get('/', auth, getUsers)
router.put('/', updateUser)
router.delete('/', deleteUser)

module.exports = router;