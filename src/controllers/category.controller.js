const Category = require('../models/category.model');

const getCategories = async (req, res) => {

    try {
        const resp = await  Category.find()
        return res.json({
            message: "Categorias",
            detail: resp
        })
    } catch(error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
} 

const createCategory = async (req, res) => {
    try {

        const category = new Category(req.body)
        const resp = await category.save()
        return res.json({
            message: "category was successfully created",
            detail: resp
        })
        
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }

} 

const updateCategory = async (req, res) => {
    try {
        const updatedCateg = req.body
        const resp = await Category.findByIdAndUpdate(
            updatedCateg._id,
            { $set: updatedCateg },
            { new: true }
        )
        return res.json(
            {
                message: 'Post updated successfully',
                detail: resp
            }
        )
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
} 

const deleteCategory = async (req, res) => {
    try {
        const resp = await Category.findByIdAndDelete(req.body._id)
        return res.json({
            message: "Post successfully deleted",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
} 

module.exports = {getCategories, createCategory, updateCategory, deleteCategory}