const Post = require('../models/post.model')


const createPost = async (req, res) => {
    try {
        const post = new Post(req.body)
        const resp = await post.save()
        return res.json({
            message: "Post successfully created",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const getPosts = async (req, res) => {
    try {
        const resp = await Post.find().populate('category').populate('user')
        return res.json({
            message: "Posts",
            detail: resp
        })
    } catch (error) {
        return res.json({
            message: 'Error',
            detail: error.message
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const updatedPost = req.body
        const resp = await Post.findByIdAndUpdate(
            updatedPost._id,
            { $set: updatedPost },
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

const deletePost = async (req, res) => {
    try {
        const resp = await Post.findByIdAndDelete(req.body._id)
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

module.exports = { createPost, getPosts, updatePost, deletePost }