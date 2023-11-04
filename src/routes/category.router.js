const express = require('express')
const router = express.Router()
const { getCategories, createCategory, updateCategory, deleteCategory } = require('../controllers/category.controller')
const auth = require('../middlewares/auth')

router.get('/', auth, getCategories);
router.post('/', auth, createCategory);
router.put('/', auth, updateCategory);
router.delete('/', auth, deleteCategory)

module.exports = router;
